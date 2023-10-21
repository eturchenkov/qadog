import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const NavBar = () => {
    return (

        <AppBar position="static">
            <Toolbar style={{ margin: "0 auto" }}>
                <Typography variant="h6">TODO APP</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
