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

const moveTodo = (todoId, newPosition) => {
  if (newPosition >= todos.length || newPosition < 0) {
    return;
  }

  const todoToMove = todos.find(todo => todo.id === todoId);

  if (!todoToMove) {
    return;
  }

  const currentPosition = todos.indexOf(todoToMove);

  if (currentPosition === newPosition) {
    return;
  }

  todos = todos.filter(todo => todo !== todoToMove);
  todos.splice(newPosition, 0, todoToMove);
};

module.exports = {
  initTodos,
  getTodos,
  addTodo,
  updateTodo,
  moveTodo,
  removeTodo,
};
