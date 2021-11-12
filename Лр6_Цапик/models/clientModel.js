const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    kindOfProperty: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactPerson: {
        type: String,
        required: true
    }
});

const Client = mongoose.model('clients', ClientSchema);
module.exports = Client;
