import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';

const CompletedTodo = ({ todo, toggleTodo }) => {
    const [checked, setChecked] = useState(todo.completed);

    const handleChange = () => setChecked(!checked);

    return (

        <Checkbox
            checked={checked}
            onChange={handleChange}
            onClick={() => toggleTodo(todo.id)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />
    );
};

export default CompletedTodo;