const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const expressMongoDb = require('express-mongo-db');
const gatos = require('./data/gatos.json');

const app = express();
app.set('view engine', 'ejs');
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded());
app.use(expressMongoDb('mongodb://localhost/rent-a-cat'));

app.get('', (req, res) => {
    res.render('index');
});

app.post('', (req, res) => {
    req.db.collection('mensagens').insert(req.body, (erro) => {
        console.log(erro);
        res.render('obrigado');
    });
});

app.get('/admin/mensagens', (req, res) => {
    req.db.collection('mensagens').find().toArray((erro, dados) => {
        res.render('admin-mensagens', {'mensagens': dados});
    });
});

app.get('/gatos', (req, res) => {
    res.render('gatos', {'gatos': gatos});
});

app.get('/sobre', (req, res) => {
    res.render('sobre');
});

app.listen(3000, () => {
    console.log('Servidor inicializado')
});