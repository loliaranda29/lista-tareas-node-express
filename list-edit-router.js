const express = require('express');
const listEditRouter = express.Router();

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


listEditRouter.use((req, res, next) => {
    if ((req.method === 'POST' || req.method === 'PUT') && !req.body) {
      return res.status(400).send("Solicitud con cuerpo vacío.");
    }
  
    if (req.method === 'POST' || req.method === 'PUT') {
      const { id, isCompleted, description } = req.body;
      if (!id || typeof isCompleted !== 'boolean' || !description) {
        return res.status(400).send("Solicitud con información no válida o atributos faltantes para crear tareas.");
      }
    }
  
    next();
  });


  //CREAR TAREAR
listEditRouter.post('/create', (req, res) => {
  const newTask = req.body; 
  tasks.push(newTask);
  res.json(newTask);
});

//ELIMINAR TAREA
listEditRouter.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada correctamente' });
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

//ACTUALIZAR TAREAS
listEditRouter.put('/update/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body; 

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

module.exports = listEditRouter;