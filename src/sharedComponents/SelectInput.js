import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
    selectLocations,
} from '../store/slices/locationsSlice';

const SelectInput = ({ label = '', onChange, onSearchChange, departureList, destinationList }) => {
    const { departureStatus, destinationStatus } =  useSelector(selectLocations);

    const renderLocationBox = (props, option) => {
        const countryCode = option?.city.country.code;
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
        <Autocomplete
            disablePortal
            loading={departureStatus === 'loading' || destinationStatus === 'loading'}
            id="location-input"
            options={departureList || destinationList}
            renderOption={renderLocationBox}
            onChange={(event, newValue) => {
                onChange(newValue?.code);
            }}
            onInputChange={(event, newInputValue) => {
                onSearchChange(newInputValue);
            }}
            noOptionsText={'No locations, type another city'}
            renderInput={renderInput}
        />
    );
};

export default SelectInput;