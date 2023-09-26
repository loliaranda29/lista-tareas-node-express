const express = require('express');
const router = express.Router();

router.get('/completed', (req, res) => {
  const completedTasks = tasks.filter((task) => task.completed);
  res.json(completedTasks);
});

router.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  res.json(incompleteTasks);
});

module.exports = router;
