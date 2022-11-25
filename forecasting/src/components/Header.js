import React from "react";

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>Energesis</Toolbar>
            </AppBar>
        </Box>
    );
}