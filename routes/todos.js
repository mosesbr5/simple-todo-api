const express = require('express');
const router = express.Router();
const data = require('../data/todos');

router.get('/', (req, res) => {
  try {
    const todos = data.getTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;
  const todos = data.getTodos();
  const item = todos.find(t => t.id === id);
  if (!item) return res.status(404).json({ error: 'not found' });
  item.title = title;
  res.json(item);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const ok = data.deleteTodo(id);
  if (ok) return res.status(200).json({ message: 'deleted' });
  res.status(404).json({ error: 'not found' });
});

module.exports = router;
