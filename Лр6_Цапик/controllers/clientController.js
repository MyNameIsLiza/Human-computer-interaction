const Client = require('../models/clientModel');
const {sendError, sendResult} = require('./baseController');
const {ObjectId} = require("mongodb");

module.exports = {
    addClient: async (req, res) => {
        console.log("addClient");
        try {
            const client = new Client(req.body);
            console.log(client);
            const found = await Client.findOne({"name": client.name});
            if (!found) {
                await client.save();
                sendResult(res, 'Success');
            } else {
                sendError(res, 400, 'Client with this name already exists')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    getClients: async (req, res) => {
        console.log("getClients");
        try {
            const clients = await Client.find({});
            console.log(clients);
            if (clients.length) {
                sendResult(res, 'Success', clients.map((item) => {
                    return {
                        "id": item._id,
                        "name": item.name,
                        "kindOfProperty": item.kindOfProperty,
                        "address": item.address,
                        "contactPerson": item.contactPerson
                    }
                }));
            } else {
                sendError(res, 400, 'Clients are missing');
            }
        } catch (error) {
            sendError(res, 400, 'Bad request');
        }
    },
    getClient: async (req, res) => {
        console.log("getClient");
        try {
            const client = await Client.findOne({_id: new ObjectId(req.body.id)});

            if (client) {
                console.log('if');
                sendResult(res, 'Success', {
                    "id": client._id,
                    "name": client.name,
                    "kindOfProperty": client.kindOfProperty,
                    "address": client.address,
                    "contactPerson": client.contactPerson
                });
            } else {
                sendError(res, 400, 'Client are missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    }
}
