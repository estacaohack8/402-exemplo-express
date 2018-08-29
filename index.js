const express = require('express');
const gatos = require('./data/gatos.json');

const app = express();
app.set('view engine', 'ejs');
app.use('/static', express.static('static'));

app.get('', (req, res) => {
    res.render('index');
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