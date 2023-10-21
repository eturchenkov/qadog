import React, { useState } from 'react';
import { connect } from 'react-redux'
import { updateTodo } from './Redux/Actions';
import Modal from 'react-modal';
import { Button, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

Modal.setAppElement('#root');
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const EditTodo = ({ dispatch, todoId, todoText }) => {
    const todoListId = todoId;

    // Modal State & Functions 
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() { setIsOpen(true); }
    function closeModal() { setIsOpen(false); }

    // Input value State
    const [innerText, setInnerText] = useState(todoText);
    const handleTextChange = (e) => setInnerText(e.target.value);

    const handleEditTodoList = (e) => {
        e.preventDefault();
        dispatch(updateTodo(todoListId, innerText));
        closeModal();
    }
    return (

        <>
            <IconButton onClick={openModal} aria-label="edit"><EditIcon /></IconButton>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
                <form onSubmit={handleEditTodoList} className="d-flex-center">
                    <TextField onChange={handleTextChange} value={innerText} id="standard-basic" label="Update Todo Text" />
                    <Button variant="contained" color="primary" type='submit' >Update</Button>
                </form>
            </Modal>
        </>
    );
};

export default connect()(EditTodo);