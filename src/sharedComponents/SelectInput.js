import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';

const SelectInput = ({ label = '', defaultValue, onChange, onSearchChange, departureList, destinationList }) => {
    
    const renderLocationBox = (props, option) => {
        const countryCode = option?.country ? option.country.code : option?.city.country.code;
        return (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
                    alt=""
                />
                {option.label} ({option.code}) {option?.country?.code}
            </Box>
        )
    };
    
    const renderInput = (params) => (
        <TextField
            {...params}
            label={label}
            inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
            }}
        />
    );

    return (
        <Box>
            <FormControl fullWidth>
                <Autocomplete
                    disablePortal
                    value={defaultValue}
                    id="location-input"
                    options={departureList || destinationList}
                    renderOption={renderLocationBox}
                    onChange={(event, newValue) => {
                        onChange(newValue.code);
                    }}
                    inputValue={defaultValue}
                    onInputChange={(event, newInputValue) => {
                        onSearchChange(newInputValue);
                    }}
                    renderInput={renderInput}
                />
            </FormControl>
        </Box>
    );
};

export default SelectInput;