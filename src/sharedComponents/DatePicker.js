import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePicker = ({ label, defaultValue = null, onChange, minDate  }) => {
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        onChange(value)
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                label={label}
                value={value}
                disablePast
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                minDate={minDate}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;