import { createSelector } from "@reduxjs/toolkit";

export const searchTextSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const filterPrioritySelector = (state) => state.filters.priority;
export const todoListSelector = (state) => state.todoList;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  filterPrioritySelector,
  searchTextSelector,
  (todoList, status, priority, searchText) => {
    // status -> 'All' 'Completed' 'To do'
    return todoList.filter((todo) => {
      if (status === "All") {
        return priority.length
          ? todo.name.includes(searchText) && priority.includes(todo.priority)
          : todo.name.includes(searchText);
      }
      return (
        todo.name.includes(searchText) &&
        (status === "Completed" ? todo.completed : !todo.completed) &&
        (priority.length ? priority.includes(todo.priority) : true)
      );
    });
  }
);

// export const todoListSelector = state => {
//     const searchText = searchTextSelector(state)
//     const todoRemaining = state.todoList.filter((todo) => {
//         return todo.name.includes(state.filters.search)
//     })
//     return todoRemaining
// }
