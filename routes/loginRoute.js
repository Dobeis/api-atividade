const jwt = require('jsonwebtoken')
const router = require('express').Router()
const UsuarioModel = require('./../models/UsuarioModel')

router.route('/')
  .post((req, res) => UsuarioModel.findOne({
    usuario: req.body.usuario
  })
    .then(usuario => {
      if (usuario && usuario.compararSenha(req.body.senha, usuario.senha)) {
        return res.status(200).json({
          token: jwt.sign({
            id: usuario._id
          }, 'jwt_secret')
        })
      } else {
        res.status(400).json({ message: 'Usuário e/ou senha incorreto(s)' })
      }
    }))

module.exports = router