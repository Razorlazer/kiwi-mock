import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const EmptyState = ({ title, description}) => {
    return (
        <Grid container alignContent='center' justifyContent='center'>
            <Grid item>
                <Card variant="outlined">        
                    <CardContent>
                        <Typography variant="h5" component="div" align='center'>
                            {title}
                        </Typography>
                        <Typography sx={{ mb: 1.5, mt: 2 }} color="text.secondary" align='center'>
                            {description}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    );
};

export default EmptyState;