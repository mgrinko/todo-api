'use strict';

const uuid = require('uuid/v1');

let todos = [
  { id: '1', completed: true, title: 'HTML' },
  { id: '2', completed: true, title: 'CSS' },
  { id: '3', completed: false, title: 'JS' },
  { id: '4', completed: false, title: 'React' },
];

const getTodos = () => {
  return todos;
};

const addTodo = (title) => {
  const newTodo = {
    id: uuid(),
    title: title,
    completed: false,
  };

  todos = [...todos, newTodo];
};

const removeTodo = (todoId) => {
  todos = todos.filter(todo => todo.id !== todoId);
};

const updateTodo = (todoId, params) => {
  todos = todos.map(todo => {
    return todo.id !== todoId
      ? todo
      : { ...todo, ...params };
  });
};

module.exports = {
  getTodos,
  addTodo,
  removeTodo,
  updateTodo,
};
