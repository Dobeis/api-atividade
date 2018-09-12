const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listaSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String
  },
  tarefas: [{
    type: Schema.Types.ObjectId,
    ref: 'tarefa'
  }]
}, {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'alteradoEm'
    },
    versionKey: false
  })

module.exports = mongoose.model('Lista', listaSchema)