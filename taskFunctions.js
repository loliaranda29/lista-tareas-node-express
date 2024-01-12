const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },

];

const tasks = [
    { id: '1', isCompleted: true, description: 'Hacer bicicleta'},
    { id: '2', isCompleted: false, description: 'Pagar servicios'},
    { id: '3', isCompleted: false, description: 'Comprar'},
    { id: '4', isCompleted: true, description: 'Enviar e-mails'},
    { id: '5', isCompleted: true, description: 'Lavar ropa'},
    { id: '6', isCompleted: false, description: 'Estudiar programación'},
    { id: '7', isCompleted: false, description: 'Hacer ejercicio en casa'},
    { id: '8', isCompleted: true, description: 'Preparar la cena'},
    { id: '9', isCompleted: false, description: 'Leer un libro'},
    { id: '10', isCompleted: true, description: 'Organizar el escritorio'},
    { id: '11', isCompleted: false, description: 'Revisar redes sociales'},
    { id: '12', isCompleted: true, description: 'Hacer llamadas telefónicas'},
    { id: '13', isCompleted: false, description: 'Aprender algo nuevo'},
    { id: '14', isCompleted: true, description: 'Limpiar la casa'},
    { id: '15', isCompleted: false, description: 'Planificar la semana siguiente'},
  ];

function authenticateUser(req, res, next) {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  req.token = token;
  next();
}

router.post('/login', authenticateUser, (req, res) => {
  res.json({ message: 'Ruta protegida de login', token: req.token });
});

router.get('/tasks', (req, res) => {
  res.json(tasks);
});

router.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

router.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json({ message: 'Tarea Creada' });
});

router.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada.' });
  }
});

router.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada!' });
  } else {
    res.status(404).json({ error: 'Tarea no encontrada...' });
  }
});

router.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

router.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = router;