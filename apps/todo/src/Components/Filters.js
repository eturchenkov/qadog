import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import FilterLink from './FilterLink';
import { resetTodo, deleteCompletedTodo, todoListFilters } from './Redux/Actions';

const Filters = ({ dispatch }) => {
    const resetList = e => dispatch(resetTodo());
    const resetCompletedTodoList = e => dispatch(deleteCompletedTodo());

    return (

        <Grid container direction="row" justify="center" alignItems="center">
            <h3>Show:</h3>
            <FilterLink filter={todoListFilters.SHOW_ALL}>All</FilterLink>
            <FilterLink filter={todoListFilters.SHOW_ACTIVE}>Active</FilterLink>
            <FilterLink filter={todoListFilters.SHOW_COMPLETED}>Completed</FilterLink>
            <Button variant="contained" style={{ marginLeft: '10px' }} onClick={resetCompletedTodoList}>Delete Completed</Button>
            <br />
            <Button variant="contained" style={{ marginLeft: '10px' }} onClick={resetList}>Reset List</Button>

        </Grid>
    );
};

export default connect()(Filters);