import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from './Redux/Actions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteTodo = ({ dispatch, todoId }) => {
    const handleDeleteTodo = id => dispatch(deleteTodo(id));

    return (

        <IconButton onClick={() => handleDeleteTodo(todoId)} aria-label="delete" color="secondary">
            <DeleteIcon />
        </IconButton>
    );
};

export default connect()(DeleteTodo);