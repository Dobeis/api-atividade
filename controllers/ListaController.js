const ListaModel = require('./../models/ListaModels')

const ListaController = {
  getAll: (req, res) => ListaModel.find()
    .populate('tarefa')
    .exec()
    .then(listas => res.status(200).json(listas))
    .catch(err => res.status(400).json(err)),
  deleteAll: (req, res) => ListaModel.deleteMany({})
    .then(() => res.status(200).json({ message: 'Todos as listas foram apagadas' }))
    .catch(err => res.status(400).json(err)),
  getById: (req, res) => ListaModel.findById(req.params.id)
    .populate('tarefa')
    .exec()
    .then(lista => res.status(200).json(lista))
    .catch(err => res.status(400).json(err)),
  create: (req, res) => ListaModel.create(req.body)
    .then(listaCriada => res.status(200).json({ listaCriada }))
    .catch(erro => res.status(400).json({ erro })),
  deleteById: (req, res) => ListaModel.deleteOne({ _id: req.params.id })
    .then(retorno => res.status(200).json({ message: 'Lista removida com sucesso' }))
    .catch(erro => res.status(400).json(erro)),
  updateById: (req, res) => ListaModel.update({ _id: req.params.id }, req.body)
    .then(sucesso => res.status(200).json({ message: 'Lista alterada com sucesso' }))
    .catch(err => res.status(400).json(err)),
  addTask: (req, res) => ListaModel.update(
    { _id: req.params.id },
    { $push: { tarefas: req.body.tarefa } },
    (err, sucesso) => {
      (err) ? console.log(err) : res.status(200).json({ message: 'Tarefa adicionada!' })
    }
  )
}

module.exports = ListaController
