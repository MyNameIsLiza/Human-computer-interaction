const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
app.use(express.json());

class Client {
    static #newId = 0;

    //назва, вид власності, адреса, телефон, контактна особа
    constructor(name, kindOfProperty, address, telephoneNumber, contactPerson) {
        this.id = Client.#newId++;
        this.name = name;
        this.kindOfProperty = kindOfProperty;
        this.address = address;
        this.contactPerson = contactPerson;
    }

    static getClientById(id) {
        Client.clients.find((item) => item.id === id)
    }

    static clients = [];
}

Client.clients = [
    new Client("Hospital of Sent Ivan", "Immovable Property", "Sent Ivan Street 78", "Ivan"),
    new Client("Morgue of dead nuns", "Immovable Property", "Sent Ivan Street 78", "Dead nun"),
    new Client("Funny Ivan", "Incorporeal Property", "Sent Ivan Street 75", "Ivan")
]

class Credit {
    static #newId = 0;

    //сума кредиту, клієнт і дата видачі
    constructor(amount, client, dateOfIssue) {
        this.id = Credit.#newId++;
        this.amount = amount;
        this.client = client;
        this.dateOfIssue = dateOfIssue;
    }

    static addCredit(credit) {
        Credit.credits.push(credit);
    }

    static credits = [];
}

app.get('/', (req, res) => {
    res.send('Hello, API')
})

app.get('/api/clients', (req, res) => {
    try {
        res.send({"message": "Success", "clients": Client.clients})
    } catch (error) {
        res.status(400).send({
            "message": "Client error"
        })
    }
})

app.get('/api/clients:clientName', (req, res) => {
    try {
        const client = Client.clients.find((client) =>
            client.name === req.params.name);
        res.send({
            "message": "Success",
            ...client,
            "extension": client.name.split('.')[client.name.split('.').length - 1],
        })
    } catch (error) {
        res.status(400).send({
            "message": `No client with '${req.params.filename}' name found`
        })
    }
})

app.post('/api/clients', (req, res) => {
    try {
        const client = Client.getClientById(req.body.clientId);
        if(client){
            Credit.addCredit(new Credit(req.body.amount, client, req.body.dateOfIssue));
        }else{
            res.status(400).send({
                "message": "Error, client is missing"
            })
        }

    } catch (error) {
        res.status(400).send({
            "message": "Error"
        })
    }
})

app.listen(8080, () => {
    console.log('API app start')
})
