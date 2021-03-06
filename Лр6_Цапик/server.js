const express = require('express');


const app = express();
app.use(express.json());

const dotenv = require('dotenv').config();

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT + '...');
});

