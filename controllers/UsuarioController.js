const enviarEmail = require('../utils/enviar-email');
const UsuarioModel = require('./../models/UsuarioModel')

const UsuarioController = {
  getAll: (req, res) => UsuarioModel.find()
    .populate('listas')
    .exec()
    .then(usuarios => res.status(200).json(usuarios))
    .catch(err => res.status(400).json(err)),
  deleteAll: (req, res) => UsuarioModel.deleteMany({})
    .then(() => res.status(200).json({ message: 'Todos os usuários foram apagados' }))
    .catch(err => res.status(400).json(err)),
  getById: (req, res) => UsuarioModel.findById(req.params.id)
    .populate('listas')
    .exec()
    .then(usuario => res.status(200).json(usuario))
    .catch(err => res.status(400).json(err)),
  create: (req, res) => UsuarioModel.create(req.body)
    .then(usuarioCriado => {
      enviarEmail(usuarioCriado)
        .then(sucesso => {
          res.status(200).json({ usuarioCriado })
        })
        .catch(err => {
          res.status(400).json(err)
        })
    })
    .catch(erro => res.status(400).json({ erro })),
  deleteById: (req, res) => UsuarioModel.deleteOne({ _id: req.params.id })
    .then(retorno => res.status(200).json({ message: 'Usuário removido com sucesso' }))
    .catch(erro => res.status(400).json(erro)),
  updateById: (req, res) => UsuarioModel.update({ _id: req.params.id }, req.body)
    .then(sucesso => res.status(200).json({ message: 'Usuário alterado com sucesso' }))
    .catch(err => res.status(400).json(err))
}

module.exports = UsuarioController