import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';

function valuetext(value) {
    return `${value}$`;
}

const marks = [
    {
        value: 0,
        label: '10$',
    },
    {
        value: 20,
        label: '20$',
    },
    {
        value: 50,
        label: '50$',
    },
    {
        value: 100,
        label: '100$',
    },
];

const PriceSlider = () => {
    return (
        <Grid container spacing={2}>
            <Grid item>
                <InputLabel id="demo-simple-select-label">Price:</InputLabel>
            </Grid>
            <Grid item>       
                <Box sx={{ width: 300 }}>
                    <Slider
                        aria-label="Price"
                        defaultValue={20}
                        getAriaValueText={valuetext}
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default PriceSlider;