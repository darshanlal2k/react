import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import { FormControl, Box, Button, InputLabel, Select, MenuItem, Container, Grid } from '@mui/material';

export default function CountryChoose() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const countriesData = Country.getAllCountries().map((country) => ({
            label: country.name,
            value: country.isoCode,
        }));
        setCountries(countriesData);
    }, []);

    const handleCountryChange = (value) => {
        console.log(value);
        setSelectedCountry(value);
        const selectedCountryData = Country.getCountryByCode(value);
        console.log(selectedCountryData);
        if (selectedCountryData) {
            const statesData = State.getStatesOfCountry(selectedCountryData.isoCode).map((state) => ({
                label: state.name,
                value: state.isoCode,
            }));
            console.log(statesData);
            setStates(statesData);
            setCities([]);
            setSelectedState('');
            setSelectedCity('');
        }
    };

    const handleStateChange = (value) => {
        console.log(value);
        setSelectedState(value);
        const selectedStateData = State.getStateByCode(value);
        console.log(selectedStateData);
        if (selectedStateData) {
            const citiesData = City.getCitiesOfState(selectedStateData.countryCode, selectedStateData.isoCode).map((city) => ({
                label: city.name,
                value: city.name,
            }));
            console.log(citiesData);
            setCities(citiesData);
            setSelectedCity('');
        }
    };
    const handleCityChange = (value) => {
        setSelectedCity(value);
    };

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            id="country"
                            value={selectedCountry}
                            onChange={(e) => handleCountryChange(e.target.value)}
                        >
                            <MenuItem value="">Select Country</MenuItem>
                            {countries.map((country) => (
                                <MenuItem key={country.value} value={country.value}>
                                    {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="state-label">State</InputLabel>
                        <Select
                            labelId="state-label"
                            id="state"
                            value={selectedState}
                            onChange={(e) => handleStateChange(e.target.value)}
                        >
                            <MenuItem value="">Select State</MenuItem>
                            {states.map((state) => (
                                <MenuItem key={state.value} value={state.value}>
                                    {state.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="city-label">City</InputLabel>
                        <Select labelId="city-label" id="city" value={selectedCity}
                            onChange={(e) => handleCityChange(e.target.value)} >
                            <MenuItem value="">Select City</MenuItem>
                            {cities.map((city) => (
                                <MenuItem key={city.value} value={city.value}>
                                    {city.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* <TextField
                        fullWidth
                        variant="outlined"
                        label="Pincode"
                        name="pincode"
                        value={formik.values.pincode}
                        onChange={handlePincodeChange}
                        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                        helperText={(formik.touched.pincode && formik.errors.pincode) || ' '}
                    /> */}
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

