import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Toggle() {
    const [alignment, setAlignment] = React.useState('left');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const children = [
        <ToggleButton value="left" key="left">
            return
        </ToggleButton>,
        <ToggleButton value="center" key="center">
            One way
        </ToggleButton>,
        <ToggleButton value="right" key="right">
            Multi-city
        </ToggleButton>,
        <ToggleButton value="justify" key="justify">
            Nomad
        </ToggleButton>,
    ];

    const control = {
        value: alignment,
        onChange: handleChange,
        exclusive: true,
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // TODO Replace with Stack
                '& > :not(style) + :not(style)': { mt: 2 },
            }}
        >
            <ToggleButtonGroup size="small" {...control}>
                {children}
            </ToggleButtonGroup>
            {/* <ToggleButtonGroup {...control}>{children}</ToggleButtonGroup>
            <ToggleButtonGroup size="large" {...control}>
                {children}
            </ToggleButtonGroup> */}
        </Box>
    );
}
