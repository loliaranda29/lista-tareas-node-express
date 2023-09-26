const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
  const description = req.body.description;
  if (description) {
    const id = uuidv4();
    tasks.push({ id, description, completed: false });
    res.status(201).json({ id });
  } else {
    res.status(400).json({ error: 'Descripción de tarea no proporcionada.' });
  }
});

router.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(400).json({ error: 'ID de tarea no válido.' });
  }
});

router.put('/update/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(400).json({ error: 'ID de tarea no válido.' });
  }
});

module.exports = router;
