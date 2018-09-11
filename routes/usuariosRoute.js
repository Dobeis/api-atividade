const router = require('express').Router()
const UsuarioController = require('./../controllers/UsuarioController')
const jwtAuth = require('./../middlewares/jwt-auth')
const emailAuth = require('./../middlewares/email-auth')
const adminAuth = require('./../middlewares/admin-auth')


router.route('/')
  .post((req, res) => UsuarioController.create(req, res))

router.route('/')
  .all(emailAuth)
  .all(jwtAuth)
  .all(adminAuth)
  .get((req, res) => UsuarioController.getAll(req, res))
  .delete((req, res) => UsuarioController.deleteAll(req, res))

router.route('/:id')
  .all(emailAuth)
  .get((req, res) => UsuarioController.getById(req, res))
  .delete((req, res) => UsuarioController.deleteById(req, res))
  .put((req, res) => UsuarioController.updateById(req, res))

module.exports = router