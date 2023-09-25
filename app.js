const express = require('express');
const app = express();
const port = 3000;
const uuidv4 = require('uuid').v4;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const tasks = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/list', (req, res) => {
  const taskList = tasks.map((task) => ({
    id: task.id,
    isCompleted: task.completed,
    description: task.description,
  }));

  res.json(taskList);
});

app.post('/add', (req, res) => {
  const description = req.body.description;
  if (description) {
    const id = uuidv4();
    tasks.push({ id, description, completed: false });
    res.redirect('/');
  } else {
    res.status(400).send('Descripción de tarea no proporcionada.');
  }
});

app.post('/complete', (req, res) => {
  const taskId = req.body.taskId;
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = true;
    res.redirect('/');
  } else {
    res.status(400).send('ID de tarea no válido.');
  }
});

app.post('/delete', (req, res) => {
  const taskId = req.body.taskId;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.redirect('/');
  } else {
    res.status(400).send('ID de tarea no válido.');
  }
});

app.listen(port, () => {
  console.log(`Aplicación de tareas escuchando en http://localhost:${port}`);
});
