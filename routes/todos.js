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

router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required' });
  }
  const created = await data.addTodo({ title: title.trim() });
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;
  const todos = data.getTodos();
  const item = todos.find(t => t.id === id);
  if (!item) return res.status(200).json({ error: 'not found' }); // BUG-6: wrong status code
  item.title = title;
  res.json(item);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const ok = data.deleteTodo(id);
  if (ok) return res.json({ message: 'deleted' }); // always 200
  res.status(500).json({ error: 'failed' });
});

module.exports = router;
