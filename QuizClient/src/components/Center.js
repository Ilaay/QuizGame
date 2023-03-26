import { Grid } from "@mui/material";
import { height, minHeight } from "@mui/system";
import React from "react";

export default function Center(props) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{minHeight : "100vh"}}>

            <Grid item xs={1}>
                {props.children}
            </Grid>

        </Grid>
    )
}