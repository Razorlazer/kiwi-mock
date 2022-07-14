import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

import { timeEpochUTCtoLocal } from '../../utilities/helperFunctions';

//TODO: it is a bit messy here. Optimize later
const routeBox = (route) => (
    <Grid item>
        <Grid container spacing={2} direction={'row'}>
            <Grid item>
                <Grid container spacing={2} direction={'column'}>
                    <Grid item>
                        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                            Departure time: {timeEpochUTCtoLocal(route.dTimeUTC)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FlightTakeoffIcon />  <Typography variant="h7" >{route.cityFrom} ({route.flyFrom})</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={2} direction={'column'}>
                    <Grid item>
                        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                            Arrival time: {timeEpochUTCtoLocal(route.aTimeUTC)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FlightLandIcon /><Typography variant="h7">
                            {route.cityTo} ({route.flyTo})
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>);

const flightInfoBox = ({
    fly_duration,
    has_airport_change,
    airlines,
    baglimit: { hand_weight, hold_weight }
}, currency, price)=> {
    return <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Grid item>
            <Chip label={`Duration: ${fly_duration}`} variant="outlined" color="primary" />
        </Grid>
        <Grid item>
            <Chip label={`Price: ${price} ${currency}`} variant="outlined"  color="success" />
        </Grid>
        <Grid item>
            <Chip label={`Airport change: ${has_airport_change ? 'Yes' : 'No'}`} variant="outlined"/>
        </Grid>
        <Grid item>
            <Chip label={`Airlines: ${airlines.join(', ')}`} variant="outlined" />
        </Grid>
        <Grid item>
            <Chip 
                label={`Hand luggage: ${hand_weight || 0} kg. Hold weight: ${hold_weight || 0} kg`} variant="outlined"
             />
        </Grid>
    </Grid>
}

const FlightCard = ({flight}) => {
    const currency = flight?.conversion && Object.keys(flight.conversion)[0];
    const price = flight?.conversion && Object.values(flight.conversion)[0];
    
    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container direction='row' spacing={2}>
                    <Grid item lg={7} md={7} sm={12} >
                        <Grid container  direction={'column'} spacing={4}>
                            {flight.route.map(route => routeBox(route))}
                        </Grid>
                    </Grid>
                    <Grid item lg={1} md={1}>
                        <Divider orientation="vertical" />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12}>
                        <Grid container direction={'column'} spacing={2}>
                            <Grid item lg={12}>
                                {flightInfoBox(flight, currency, price)}
                            </Grid>
                            <Grid item lg={12}>
                                <Button variant="contained" fullWidth color='success'>Book</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default FlightCard;