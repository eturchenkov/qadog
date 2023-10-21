import { combineReducers } from 'redux';
import { todoListFilters } from './Actions';


const todos = (state = [], action) => {
    switch (action.type) {

        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];

        case 'UPDATE_TODO':
            return state.map(todo =>
                (todo.id === action.id) ?
                    { ...todo, text: action.text } :
                    todo
            )

        case 'DELETE_TODO':
            return state.filter(todo =>
                todo.id !== action.id
            )
        case 'DELETE_COMPLETED_TODO':
            return state.filter(todo => !todo.completed
            )

        case 'RESET_TODO':
            return state = []

        case 'TOGGLE_TODO':
            return state.map(todo =>
                (todo.id === action.id) ?
                    { ...todo, completed: !todo.completed } :
                    todo
            )

        default: return state;
    }
};

const todoListFilter = (state = todoListFilters.SHOW_ALL, action) => {

    switch (action.type) {
        case 'SET_TODOLIST_FILTER':
            return action.filter;
        default: return state;
    }

};
export default combineReducers({
    todos,
    todoListFilter
});