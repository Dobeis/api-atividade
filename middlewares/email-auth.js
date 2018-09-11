const UsuarioModel = require('./../models/UsuarioModel')

const emailAuth = (req, res, next) => {
  if (!req.authUser.verificado) {
    return res.status(400).json({ message: 'Email não verificado!' })
  }
  return next()
}

module.exports = emailAuth