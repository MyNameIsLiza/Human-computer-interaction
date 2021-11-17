const Credit = require('../models/creditModel');
const Client = require('../models/clientModel');
const {ObjectId} = require("mongodb");
const {sendError, sendResult} = require('./baseController');

async function getOpenCreditByClientId(clientId) {
    const found = await Credit.find({"clientId": clientId});
    return found.find((item) => !item.dateOfRefund);
}

module.exports = {
    addCredit: async (req, res) => {
        console.log("addCredit");
        try {
            const credit = new Credit(req.body);
            console.log('OpenCredit', getOpenCreditByClientId(credit.clientId));
            if (!await getOpenCreditByClientId(credit.clientId)) {
                const client = await Client.findOne({_id: new ObjectId(credit.clientId)});
                if (client) {
                    await credit.save();
                    sendResult(res, 'Success', {
                        "id": credit._id,
                        "amount": credit.amount,
                        "clientId": credit.clientId,
                        "dateOfIssue": credit.dateOfIssue,
                        "dateOfRefund": credit.dateOfRefund || 'The credit is not closed'
                    });
                } else {
                    sendError(res, 400, 'This client is missing');
                }
            } else {
                sendError(res, 400, 'This client already has a open credit');
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
            console.log('OpenCredit', await getOpenCreditByClientId(credit.clientId));
            if (await getOpenCreditByClientId(credit.clientId)) {
                if (credit.amount > req.body.amount) {
                    console.log("if");
                    credit.amount -= req.body.amount;
                } else {
                    console.log("else");
                    change = req.body.amount - credit.amount;
                    credit.amount = 0;
                    credit.dateOfRefund = new Date();
                    const diff = parseInt((credit.dateOfRefund - credit.dateOfIssue) / (24 * 3600 * 1000));
                    console.log(diff);
                    if (diff > 100) {
                        fine = (diff - 100) * 100;
                    }
                }
                await credit.save();
                sendResult(res, 'Success', {
                    "id": credit._id,
                    "amount": credit.amount,
                    "clientId": credit.clientId,
                    "dateOfIssue": credit.dateOfIssue,
                    "dateOfRefund": credit.dateOfRefund || 'The credit is not closed',
                    "fine": fine,
                    "change": change
                });
            } else {
                sendError(res, 400, 'Credit is missing or closed')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    }
}
