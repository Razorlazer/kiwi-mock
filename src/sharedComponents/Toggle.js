import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Toggle = ({ toggleOptions = [] , defaultValue = 'M', onChange }) => {
    const [value, setValue] = React.useState(defaultValue);
    const [options, setOptions] = React.useState([]);

    const handleChange = (event, type) => {
        setValue(type);
        onChange(type);
    };

    React.useEffect(() => {
        setOptions(
            toggleOptions.map(option => (
                <ToggleButton value={option.value} key={option.value}>
                    {option.label}
                </ToggleButton>
            )
        ));
    }, [toggleOptions]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > :not(style) + :not(style)': { mt: 2 },
            }}
        >
            <ToggleButtonGroup size="small" value={value} onChange={handleChange} exclusive={true}>
                {options}
            </ToggleButtonGroup>
        </Box>
    );
}

export default Toggle;