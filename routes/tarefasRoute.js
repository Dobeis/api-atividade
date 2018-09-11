const router = require('express').Router()
const TarefaController = require('./../controllers/TarefaController')
const jwtAuth = require('./../middlewares/jwt-auth')
const emailAuth = require('./../middlewares/email-auth')

router.route('/')
  .all(jwtAuth)
  .all(emailAuth)
  .get((req, res) => TarefaController.getAll(req, res))
  .post((req, res) => TarefaController.create(req, res))
  .delete((req, res) => TarefaController.deleteAll(req, res))

router.route('/:id')
  .all(emailAuth)
  .get((req, res) => TarefaController.getById(req, res))
  .delete((req, res) => TarefaController.deleteById(req, res))
  .put((req, res) => TarefaController.updateById(req, res))

module.exports = router