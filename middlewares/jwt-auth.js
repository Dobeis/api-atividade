const jwt = require('jsonwebtoken')
const UsuarioModel = require('./../models/UsuarioModel')

const jwtAuth = (req, res, next) => {
  const authorization = req.get('Authorization')
  
  const token = authorization
  
  if (!authorization || !token) {
    return res.status(401).json({ message: 'Acesso restrito. Token não fornecido.' })
  } else {
    jwt.verify(token, 'jwt_secret', (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'Acesso restrito. Token inválido.' })
      } else {
        UsuarioModel.findById(decoded.id)
          .then(usuario => {
            req['authUser'] = usuario
            return next()
          })
          .catch(erro => {
            res.status(401).json({ message: 'Acesso restrito. Usuário e/ou senha incorretos.' })
          })
      }
    })
  }
}

module.exports = jwtAuth