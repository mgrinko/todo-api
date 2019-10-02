'use strict';

const uuid = require('uuid/v1');

let todos = [];

const initTodos = (initialTodos = []) => {
  todos = initialTodos;
};

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

const moveTodo = (todoId, position) => {
  if (position >= todos.length || position < 0) {
    return;
  }

  const index = todos.findIndex(todo => todo.id === todoId);

  if (index < 0 || index === position) {
    return;
  }

  const copy = [...todos];
  [copy[index], copy[position]] = [todos[position], todos[index]];
  todos = copy;
};

module.exports = {
  initTodos,
  getTodos,
  addTodo,
  updateTodo,
  moveTodo,
  removeTodo,
};
