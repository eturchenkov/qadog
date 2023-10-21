import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { setTodoListFilter } from './Redux/Actions';

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.todoListFilter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setTodoListFilter(ownProps.filter))
});

const FilterLink = ({ active, children, onClick }) => {
    return (

        <Button
            variant="contained"
            onClick={onClick}
            disabled={active}
            style={{ marginLeft: '10px' }}
        >
            {children}
        </Button>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);