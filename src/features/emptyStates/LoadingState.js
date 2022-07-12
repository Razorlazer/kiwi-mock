import * as React from 'react';
import { CircularProgress, Grid } from '@mui/material';

const LoadingState = () =>
    (<Grid container justifyContent={'center'} alignContent={'center'} spacing={5}>
        <Grid item>
            <CircularProgress disableShrink />
        </Grid>
    </Grid>
);

export default LoadingState;