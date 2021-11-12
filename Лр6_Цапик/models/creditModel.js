const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = require("mongodb");

const CreditSchema = new Schema({
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
    }
});

const Credit = mongoose.model('credits', CreditSchema);
module.exports = Credit;
