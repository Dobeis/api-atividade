const router = require('express').Router()
const ListaController = require('./../controllers/ListaController')
const jwtAuth = require('./../middlewares/jwt-auth')
const emailAuth = require('./../middlewares/email-auth')

router.route('/')
  .all(jwtAuth)
  .all(emailAuth)
  .get((req, res) => ListaController.getAll(req, res))
  .post((req, res) => ListaController.create(req, res))
  .delete((req, res) => ListaController.deleteAll(req, res))

router.route('/:id')
  .all(emailAuth)
  .get((req, res) => ListaController.getById(req, res))
  .delete((req, res) => ListaController.deleteById(req, res))
  .put((req, res) => ListaController.updateById(req, res))

module.exports = router