const express = require('express');
const bodyParser = require('body-parser');
const expressMongoDb = require('express-mongo-db');
const ObjectID = require('mongodb').ObjectID;

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

app.get('/gatos', (req, res) => {
    req.db.collection('gatos').find().toArray((erro, dados) => {
        res.render('gatos', {'gatos': dados});
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre');
});

app.get('/admin/mensagens', (req, res) => {
    req.db.collection('mensagens').find().toArray((erro, dados) => {
        res.render('admin-mensagens', {'mensagens': dados});
    });
});

app.get('/admin/gatos', (req, res) => {
    req.db.collection('gatos').find().toArray((erro, dados) => {
        res.render('admin-gatos', {'gatos': dados});
    });
});

app.get('/admin/gatos/inserir', (req, res) => {
    res.render('admin-gatos-inserir', {'mensagem': ''});
});

app.post('/admin/gatos/inserir', (req, res) => {
    req.db.collection('gatos').insert(req.body, (erro) => {
        console.log(erro);
        res.render('admin-gatos-inserir', {'mensagem': 'O gato foi inserido com sucesso.'});
    });
});

app.post('/admin/gatos/:id', (req, res) => {
    let id = ObjectID(req.params.id);

    req.db.collection('gatos').remove({_id: id}, (erro) => {
        console.log(erro);
        res.redirect('/admin/gatos');
    });
});

app.listen(3000, () => {
    console.log('Servidor inicializado')
});