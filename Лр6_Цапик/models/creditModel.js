const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = require("mongodb");

class CreditType {
    constructor(name, interestRate, term) {
        this.name = name;
        this.interestRate = interestRate;
        this.term = term;
    }

    static INVESTMENT = new CreditType('INVESTMENT', 5, 15);
    static FARMER = new CreditType('FARMER', 10, 20);
    static TREASURY = new CreditType('TREASURY', 15, 5);
    static EASY = new CreditType('EASY', 3, 1);
}

const CreditSchema = new Schema({
    creditType: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    clientId: {
        type: ObjectId,
        required: true
    },
    dateOfIssue: {
        type: Date,
        required: true
    },
    dateOfRefund: {
        type: Date,
        required: false
    },
    fine: {
        type: Number,
        required: false
    }
});

const Credit = mongoose.model('credits', CreditSchema);
module.exports = {Credit, CreditType};
