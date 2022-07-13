import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';

const SliderWithLabel = ({ label, marks, step = 10, defaultValue = null, onChange, valuetext }) => {
    const [value, setValue] = React.useState(defaultValue);
    const [isSliderDisabled, setSliderDisabled] = React.useState(value === 0 ? true : false);

    React.useEffect(() => {
        onChange(value);
    }, [value]);

    const toggleSliderDisabled = () => {
        setSliderDisabled(false)
    }

    return (
        <Grid container spacing={2}>
            <Grid item>
                <InputLabel id={'slider'}>{label}</InputLabel>
            </Grid>
            <Grid item>       
                <Box sx={{ width: 300 }} onClick={toggleSliderDisabled}>
                    <Slider
                        size="small"
                        max={2000}
                        aria-label="slider"
                        defaultValue={value}
                        getAriaValueText={valuetext}
                        step={step}
                        valueLabelDisplay="auto"
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        marks={marks}
                        disabled={isSliderDisabled}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default SliderWithLabel;