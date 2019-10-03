// server.js

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const {
  initTodos,
  getTodos,
  addTodo,
  moveTodo,
  updateTodo,
  removeTodo,
} = require('./server/todos');

initTodos([
  { id: '1', completed: true, title: 'HTML' },
  { id: '2', completed: true, title: 'CSS' },
  { id: '3', completed: false, title: 'JS' },
  { id: '4', completed: false, title: 'React' },
]);

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'content-type');
  res.set('Access-Control-Allow-Methods', 'DELETE,PATCH');
  next();
});

app.get('/todos', (req, res) => {
  res.json(getTodos())
});

app.post('/todos', bodyParser.json(), (req, res) => {
  if (!req.body || !req.body.title) {
    throw new Error('A title was not sent');
  }

  addTodo(req.body.title);
  const todos = getTodos();

  res.json(todos[todos.length - 1]);
});

app.delete('/todos/:todoId', (req, res) => {
  removeTodo(req.params.todoId);

  res.json({ status: 'success' });
});

app.patch('/todos/:todoId', bodyParser.json(), (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    throw new Error('Data was not sent');
  }

  const { title, completed, position } = req.body;
  const { todoId } = req.params;

  if (title) {
    updateTodo(todoId, { title });
  }

  if (completed !== undefined) {
    updateTodo(todoId, { completed });
  }

  if (position) {
    moveTodo(todoId, position)
  }

  res.json({ status: 'success' });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Todo API is running on port ${port}!`);
});
