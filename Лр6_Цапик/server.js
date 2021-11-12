const express = require('express');

const app = express();
app.use(express.json());

const dotenv = require('dotenv').config();

require('./initDB')();

app.get('/', (req, res) => {
    res.send('Ви – керівник інформаційно-аналітичного центру коммерційного банку. Одним з існуючих\n' +
        'видів діяльності Вашого банку є видача кредитів юридичним особам. Ваше завдання –\n' +
        'стеження за динамікою роботи кредитного відділу.\n' +
        'В залежності від умов одержання кредиту, відсоткової ставки і терміну повернення, всі\n' +
        'кредитні операції розподіляються на декілька основних видів. Кожний з цих видів має свою\n' +
        'назву.\n' +
        'Кредит може одержати юридична особа (клієнт), яка при реєстрації надає наступні\n' +
        'відомості: назва, вид власності, адреса, телефон, контактна особа. Кожний факт видачі\n' +
        'кредиту реєструється банком, при цьому фіксується сума кредиту, клієнт і дата видачі.\n' +
        'Необхідно враховувати в системі ще й дату фактичного повернення грошей. Необхідно\n' +
        'також враховувати, що кредит може повертатися частинами, і за затримку повернення\n' +
        'кредиту нараховуються штрафи.')
})

const clientRouter = require("./routes/clientRouter.js");
const creditRouter = require("./routes/creditRouter.js");

app.use("/api/clients", clientRouter);
app.use("/api/credits", creditRouter);


/*app.get('/api/clients', (req, res) => {
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
})*/

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT + '...');
});

