import { Paper } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux'
import CompletedTodo from './CompletedTodo';
import DeleteTodo from './DeleteTodo';
import EditTodo from './EditTodo';
import { todoListFilters, toggleTodo } from './Redux/Actions';

const getTodoList = (todos, filter) => {
    switch (filter) {

        case todoListFilters.SHOW_ALL:
            return todos;

        case todoListFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);

        case todoListFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);

        default:
            throw new Error('Unknown filter' + filter);
    }
};

const mapStateToProps = state => {
    return ({
        todos: getTodoList(state.todos, state.todoListFilter)
    })
};

const mapDispatchToProps = dispatch => {
    return {
        toggleTodo: id => dispatch(toggleTodo(id))
    }
};

const TodoList = ({ todos, toggleTodo }) => {


    return (

        <div>
            <ul>{
                todos.map((todo) => (
                    <Paper className="d-flex-space-between"
                        elevation={3}
                        key={todo.id}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginTop: '20px', padding: '10px' }}
                    >
                        <div>
                            <CompletedTodo toggleTodo={toggleTodo} todo={todo}></CompletedTodo>
                            <span>{todo.text}</span>
                        </div>
                        <div>
                            <EditTodo todoId={todo.id} todoText={todo.text}></EditTodo>
                            <DeleteTodo todoId={todo.id}></DeleteTodo>
                        </div>
                    </Paper>
                ))
            }
            </ul>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);