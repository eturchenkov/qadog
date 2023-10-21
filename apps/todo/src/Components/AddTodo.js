import { Grid, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from './Redux/Actions';

const AddTodo = ({ dispatch }) => {
    const [todo, setTodo] = useState('');
    const handleSetTodo = e => setTodo(e.target.value);

    const addTask = e => {
        e.preventDefault();

        if (todo) {
            dispatch(addTodo(todo));
        }
        else {
            alert('write somthing');
        }

        setTodo('');
    };

    return (

        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
                <form onSubmit={addTask} className="d-flex-center">
                    <Grid item xs={6} md={8}>
                        <TextField fullWidth margin="normal" onChange={handleSetTodo} id="standard-basic" value={todo} label="List Your Todos..." />
                    </Grid>
                    <Button variant="contained" size="large" color="primary" type="submit"> Add Todo</Button >
                </form>
            </Grid>
        </Grid>
    );
};

export default connect()(AddTodo);