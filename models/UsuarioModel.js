const { hashSync, genSaltSync, compareSync } = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuarioSchema = new Schema({
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  eh_administrador: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true
  },
  listas: [{
    type: Schema.Types.ObjectId,
    ref: 'Lista'
  }],
  verificado: {
    type: Boolean,
    default: false
  },
}, {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'alteradoEm'
    },
    versionKey: false
  })

usuarioSchema.methods.compararSenha = (senha, senhaHash) => compareSync(senha, senhaHash)

usuarioSchema.pre('save', function (next) {
  this.senha = hashSync(this.get('senha'), genSaltSync())
  next()
})

usuarioSchema.pre('update', function (next) {
  if (this.getUpdate().senha) {
    this.getUpdate().senha = hashSync(this.getUpdate().senha, genSaltSync())
  }
  next()
});

module.exports = mongoose.model('Usuario', usuarioSchema)