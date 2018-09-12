const TarefaModel = require('./../models/TarefaModel')
const ListaModel = require('./../models/ListaModels')

const TarefaController = {
  getAll: (req, res) => TarefaModel.find()
    .populate('lista')
    .exec()
    .then(tarefas => res.status(200).json(tarefas))
    .catch(err => res.status(400).json(err)),
  deleteAll: (req, res) => TarefaModel.deleteMany({})
    .then(() => res.status(200).json({ message: 'Todas as tarefas foram apagadas' }))
    .catch(err => res.status(400).json(err)),
  getById: (req, res) => TarefaModel.findById(req.params.id)
    .populate('lista')
    .exec()
    .then(tarefa => res.status(200).json(tarefa))
    .catch(err => res.status(400).json(err)),
  create: (req, res) => TarefaModel.create(req.body)
    .then(tarefaCriada => {
      ListaModel.updateOne(
        { _id: tarefaCriada.lista },
        { $push: { tarefas: tarefaCriada._id } })
          .then(sucesso => {
            res.status(200).json({ tarefaCriada })
          })
          .catch(err => {
            res.status(400).json({ err })
          })
    })
    .catch(erro => res.status(400).json({ erro })),
  deleteById: (req, res) => TarefaModel.deleteOne({ _id: req.params.id })
    .then(retorno => res.status(200).json({ message: 'Tarefa removida com sucesso' }))
    .catch(erro => res.status(400).json(erro)),
  updateById: (req, res) => TarefaModel.update({ _id: req.params.id }, req.body)
    .then(sucesso => res.status(200).json({ message: 'Tarefa alterada com sucesso' }))
    .catch(err => res.status(400).json(err))
}

module.exports = TarefaController
