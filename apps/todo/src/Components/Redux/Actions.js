
let nextTodoId = 0;

export const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
});
export const updateTodo = (id, text) => ({
    type: 'UPDATE_TODO',
    id,
    text
});
export const deleteTodo = id => ({
    type: 'DELETE_TODO',
    id
});
export const deleteCompletedTodo = () => ({
    type: 'DELETE_COMPLETED_TODO'
});
export const resetTodo = () => ({
    type: 'RESET_TODO'
});

export const todoListFilter = filter => ({
    type: 'SET_TODOLIST_FILTER',
    filter
});

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
});

export const setTodoListFilter = filter => ({
    type: 'SET_TODOLIST_FILTER',
    filter
});

export const todoListFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};