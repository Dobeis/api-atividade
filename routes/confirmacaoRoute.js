const jwt = require('jsonwebtoken')
const router = require('express').Router()
const UsuarioModel = require('./../models/UsuarioModel')

router.route('/:id')
  .get((req, res) => UsuarioModel.findByIdAndUpdate(req.params.id,
    {
      $set: { verificado: true }
    },
    { new: true },
    (err, alterado) => {
      if (err) {
        res.status(400).json({ message: 'Usuário já verificado ou invalido!' })
      } else {
        res.status(200).json({ message: 'Usuário verificado com sucesso!' })
      }
    }))

module.exports = router