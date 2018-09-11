const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tarefaSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String
  },
  lista: {
    type: Schema.Types.ObjectId,
    ref: 'Lista'
  },
  concluida: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'alteradoEm'
    },
    versionKey: false
  })

module.exports = mongoose.model('Tarefa', tarefaSchema)