const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

//Routes
const homeRoute = require('./routes/homeRoute')
const confirmacaoRoute = require('./routes/confirmacaoRoute')
const loginRoute = require('./routes/loginRoute')
const usuariosRoute = require('./routes/usuariosRoute')
const tarefasRoute = require('./routes/tarefasRoute')
const listasRoute = require('./routes/listasRoute')

const db = mongoose.connection
mongoose.connect('mongodb://root:123mudar@ds251622.mlab.com:51622/api-atividade', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

db.on('error', (err) => {
  console.log('Erro ao conectar no MLab: \n' + JSON.stringify(err) + '\n')
})

app.use(cors())
app.use(bodyParser.json())

app.use('/', homeRoute)
app.use('/confirmacao', confirmacaoRoute)
app.use('/login', loginRoute)
app.use('/usuarios', usuariosRoute)
app.use('/tarefas', tarefasRoute)
app.use('/listas', listasRoute)

module.exports = app

