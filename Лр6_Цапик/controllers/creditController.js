const {Credit, CreditType} = require('../models/creditModel');
const Client = require('../models/clientModel');
const {ObjectId} = require("mongodb");
const {sendError, sendResult} = require('./baseController');

async function getOpenCreditByClientId(clientId) {
    const found = await Credit.find({"clientId": clientId});
    return found.find((item) => !item.dateOfRefund);
}

function round(number) {
    return parseFloat(number.toFixed(2))
}

module.exports = {
    addCredit: async (req, res) => {
        console.log("addCredit");
        try {
            const credit = new Credit({...req.body, creditType: CreditType[req.body.creditType]});
            if (!await getOpenCreditByClientId(credit.clientId)) {
                const client = await Client.findOne({_id: new ObjectId(credit.clientId)});
                if (client) {
                    await credit.save();
                    sendResult(res, 'Success', {
                        "id": credit._id,
                        "creditType": credit.creditType.name,
                        "amount": credit.amount,
                        "clientId": credit.clientId,
                        "dateOfIssue": credit.dateOfIssue,
                        "dateOfRefund": credit.dateOfRefund || 'The credit is not closed'
                    });
                } else {
                    sendError(res, 400, 'This client is missing');
                }
            } else {
                sendError(res, 400, 'This client already has an open credit');
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    getCredits: async (req, res) => {
        console.log("getCredits");
        try {
            const credits = await Credit.find({});
            if (credits.length) {
                sendResult(res, 'Success', credits.map((item) => {
                    return {
                        "id": item._id,
                        "creditType": item.creditType.name,
                        "amount": item.amount,
                        "clientId": item.clientId,
                        "dateOfIssue": item.dateOfIssue,
                        "dateOfRefund": item.dateOfRefund || 'The credit is not closed'
                    }
                }));
            } else {
                sendError(res, 400, 'Credits are missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    payCredit: async (req, res) => {
        console.log("payCredit");
        try {
            const credit = await Credit.findOne({_id: new ObjectId(req.body.id)});
            let change = 0;
            let fine = 0;
            if (await getOpenCreditByClientId(credit.clientId)) {
                const realAmount = round(req.body.amount * (1 - credit.creditType.interestRate / 100));
                if (credit.amount > realAmount) {
                    credit.amount -= parseFloat(realAmount.toFixed(2));
                } else {
                    change = realAmount - credit.amount;
                    credit.dateOfRefund = new Date();
                    const diff = credit.dateOfRefund.getFullYear() - credit.dateOfIssue.getFullYear();
                    if (diff > credit.creditType.term) {
                        fine = credit.amount * (1 + credit.creditType.interestRate / 100);
                    }
                    credit.amount = 0;
                }
                await credit.save();
                sendResult(res, 'Success', {
                    "id": credit._id,
                    "creditType": credit.creditType.name,
                    "amountPaid": realAmount,
                    "amount": credit.amount,
                    "clientId": credit.clientId,
                    "dateOfIssue": credit.dateOfIssue,
                    "dateOfRefund": credit.dateOfRefund || 'The credit is not closed',
                    "fine": round(fine),
                    "change": round(change)
                });
            } else {
                sendError(res, 400, 'Credit is missing or closed')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    }
}
