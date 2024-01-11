const express = require('express');
const listViewRouter = express.Router();

//LISTA DE TAREAS
const tasks = [
  {
    id: '1',
    isCompleted: true,
    description: 'Limpiar',
  },
  {
    id: '2',
    isCompleted: false,
    description: 'Hacer la comida',
  },
  {
    id: '3',
    isCompleted: false,
    description: 'Estudiar',
  },
  {
    id: '4',
    isCompleted: true,
    description: 'Hacer bicicleta',
  },
  {
    id: '5',
    isCompleted: true,
    description: 'Hacer trabajos',
  },
];

//
listViewRouter.param('status', (req, res, next, status) => {
    if (status !== 'completed' && status !== 'incomplete') {
      return res.status(400).send("Parámetros no válidos.");
    }
    next();
  });

  listViewRouter.get('/:status', (req, res) => {

    const status = req.params.status;
  
    if (status === 'completed') {
      const completedTasks = tasks.filter(task => task.isCompleted);
      res.json(completedTasks);
    } else if (status === 'incomplete') {
      const incompleteTasks = tasks.filter(task => !task.isCompleted);
      res.json(incompleteTasks);
    }
  });

listViewRouter.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});


listViewRouter.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = listViewRouter;