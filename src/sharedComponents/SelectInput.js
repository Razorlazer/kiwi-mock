import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Skeleton from '@mui/material/Skeleton';
import { selectLocations } from '../store/slices/locationsSlice';

const SelectInput = ({ label = '', defaultValue, onChange, onSearchChange }) => {
    const { locationsList, status } = useSelector(selectLocations);
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const renderLocationBox = (props, option) => {
        const countryCode = option?.country ? option.country.code : option?.city.country.code;

        if(status === 'loading') {
            return 'Loading...'
        }
        
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
            }}
        />
    );

    return (
        <Box>
            <FormControl fullWidth>
                <Autocomplete
                    disablePortal
                    value={value}
                    id="location-input"
                    options={locationsList}
                    renderOption={renderLocationBox}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={value}
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