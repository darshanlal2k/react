import React from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Grid, Link, Button, Select, Typography, MenuItem, InputLabel, TextareaAutosize, TextField, Container, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function EditDetails() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const location = useLocation();
    const { rowData } = location.state || {};

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);


    useEffect(() => {
        const countriesData = Country.getAllCountries().map((country) => ({
            label: country.name,
            value: country.isoCode,
        }));
        setCountries(countriesData);

        // Check if rowData has state and city information and set it initially
        if (rowData && rowData.country) {
            formik.setFieldValue('country', rowData.country);
            const fetchedStates = State.getStatesOfCountry(rowData.country).map((state) => ({
                label: state.name,
                value: state.isoCode,
            }));
            setStates(fetchedStates);

            // Set the selected state from rowData
            formik.setFieldValue('state', rowData.state);

            // Fetch and set cities based on selected state
            const fetchedCities = City.getCitiesOfState(rowData.country, rowData.state).map((city) => ({
                label: city.name,
                value: city.name,
            }));
            setCities(fetchedCities);

            // Set the selected city from rowData
            formik.setFieldValue('city', rowData.city);
        }
    }, [rowData]); // Trigger effect when rowData changes

    const handleCountryChange = (event) => {
        console.log(event);
        const selectedCountry = event.target.value;
        console.log(selectedCountry);
        formik.setFieldValue('country', selectedCountry);

        // Fetch and set states based on selected country
        const fetchedStates = State.getStatesOfCountry(selectedCountry).map((state) => ({
            label: state.name,
            value: state.isoCode,
        }));
        console.log(fetchedStates);
        setStates(fetchedStates);
        // setCities([]); // Clear cities when changing country
        // formik.setFieldValue('state', ''); // Clear state selection
        // formik.setFieldValue('city', ''); // Clear city selection
        // setCities([]);
    };
    const handleStateChange = (event) => {
        console.log(event);
        const selectedState = event.target.value;
        console.log(selectedState);
        formik.setFieldValue('state', selectedState);

        const countryCode = formik.values.country; // Get selected country code
        console.log(countryCode);
        // Fetch and set cities based on selected state
        const fetchedCities = City.getCitiesOfState(countryCode, selectedState).map((city) => ({
            label: city.name,
            value: city.name,
        }));
        console.log(fetchedCities);
        setCities(fetchedCities);
        // formik.setFieldValue('city', '');
    };
    const handleCityChange = (event) => {
        formik.setFieldValue('city', event.target.value);
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required')
            .matches(/^[a-zA-Z\s]*$/, 'Only letters and spaces are allowed')
            .min(3, 'Name should be at least 3 characters')
            .max(50, 'Name should not exceed 50 characters')
        ,
        shortname: Yup.string().required('Short Name is required')
            .matches(/^[a-zA-Z\s]*$/, 'Only letters and spaces are allowed')
            .min(3, 'Short Name should be at least 3 characters')
            .max(50, 'Short Name should not exceed 50 characters')
        ,
        email: Yup.string().email('Invalid email').required('Email is required')
        ,
        address: Yup.string().required('Address is required')
            .min(10, 'Address should be at least 10 characters')
            .max(200, 'Address should not exceed 200 characters')
        ,
        country: Yup.string().required('Country is required')
        ,
        state: Yup.string().required('State is required')
        ,
        city: Yup.string().required('City is required')
        ,
        pincode: Yup.string().required('Pincode is required')
            .matches(/^\d{6}$/, 'Invalid Pincode')
            .min(6, 'Pincode must be 6 characters')
            .max(6, 'Pincode must be 6 characters')
        ,
        file: Yup.mixed().required('File upload is required')
        ,
        // Add validation for other fields if needed
    });
    const handlePincodeKeyDown = (event) => {
        const isNumber = /^\d$/; // Regular expression to check for numbers
        const isAllowedKey = event.key === 'Backspace' || event.key === 'Delete';

        if (!isNumber.test(event.key) && !isAllowedKey) {
            event.preventDefault(); // Prevents typing non-numeric characters
        }
    };
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: rowData ? rowData.name : '',
            shortname: rowData ? rowData.shortname : '',
            email: rowData ? rowData.email : '',
            address: rowData ? rowData.address : '',
            country: rowData ? rowData.country : '',
            state: rowData ? rowData.state : '',
            city: rowData ? rowData.city : '',
            pincode: rowData ? rowData.pincode : '',
            file: rowData ? rowData.file : '',
            // Initialize other fields with existing data if available
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            setIsSubmitting(true);
            try {
                console.log(values);
                toast.success('Form updated successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                    onClose: () => navigate('/gridtable')
                });
                // Perform PUT request using Axios to update data in the database
                const response = await axios.put(`http://localhost:5000/editdetails/${rowData.id}`, values);
                console.log('Updated data:', response.data);

                // navigate('/gridtable');
                // Handle success scenario, e.g., show success message, navigate, etc.
            } catch (error) {
                console.error('Update failed:', error);
                // Handle error scenario, e.g., show error message, etc.
            } finally {
                setIsSubmitting(false);
            }
        },
    });
    const handleFileChange = (event) => {
        formik.setFieldValue('file', event.currentTarget.files[0]);
    };
    return (
        // <div>
        //     <h2>Edit Hospital Details</h2>
        //     {rowData && (
        //         <div>
        //             <p>ID: {rowData.id}</p>
        //             <p>Name: {rowData.name}</p>
        //             <p>Short Name: {rowData.shortname}</p>
        //             {/* Render other details */}
        //         </div>
        //          <Grid item xs={12} xl={6}>
        //          <FormControl fullWidth>
        //            <TextField
        //              label="Hospital Legal Name"
        //              variant="outlined"
        //              name="name"
        //              fullWidth
        //              value={formik.values.name}
        //              onChange={formik.handleChange}
        //              onBlur={formik.handleBlur}
        //              error={formik.touched.name && Boolean(formik.errors.name)}
        //              helperText={(formik.touched.name && formik.errors.name)}
        //              inputProps={{
        //                onKeyDown: (event) => {
        //                  if (event.key.match(/[0-9]/)) {
        //                    event.preventDefault();
        //                  }
        //                }
        //              }}
        //            />
        //            {/* {formik.touched.name && formik.errors.name && (
        //              <div style={{ color: 'red' }}>{formik.errors.name}</div>
        //            )} */}
        //          </FormControl>
        //        </Grid>
        //     )}
        //     {/* Your edit form or components go here */}
        // </div>
        <Container>
            <ToastContainer />
            <h2>Edit Hospital Details</h2>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} m={1}>
                    <Grid item xs={12} xl={6}>
                        <FormControl fullWidth>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            /></FormControl>
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <FormControl fullWidth>
                            <TextField
                                label="Hospital Short Name"
                                variant="outlined"
                                name="shortname"
                                fullWidth
                                value={formik.values.shortname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.shortname && Boolean(formik.errors.shortname)}
                                helperText={(formik.touched.shortname && formik.errors.shortname)}
                                inputProps={{
                                    onKeyDown: (event) => {
                                        if (event.key.match(/[0-9]/)) {
                                            event.preventDefault();
                                        }
                                    }
                                }}
                            />
                            {/* {formik.touched.shortname && formik.errors.shortname && (
                <div style={{ color: 'red' }}>{formik.errors.shortname}</div>
              )} */}
                        </FormControl>
                    </Grid>
                    {/* Add other form fields using similar TextField components */}
                    {/* File Upload */}
                    <Grid item xs={12} xl={6}>
                        <FormControl fullWidth>
                            <Button
                                variant="outlined"
                                component="label"
                                size='large'
                                sx={{ pt: 2, pb: 1.5, textAlign: 'center' }}
                                startIcon={<FileUploadOutlinedIcon />}
                            >
                                Upload Hospital Logo
                                <input
                                    type="file"
                                    name='file'
                                    styles={{ display: "none" }}
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {formik.touched.file && formik.errors.file && (
                                <div style={{ color: 'red' }}>{formik.errors.file}</div>
                            )}
                        </FormControl>
                    </Grid>
                    {/* Email*/}
                    <Grid item xs={12} xl={6}>
                        <FormControl fullWidth>
                            {/* <InputLabel htmlFor="email">Email</InputLabel> */}
                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                fullWidth
                                variant="outlined"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={(formik.touched.email && formik.errors.email) || ' '}
                            />
                            {/* {formik.touched.email && formik.errors.email && (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              )} */}
                        </FormControl>
                    </Grid>
                    {/* Address*/}
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" error={formik.touched.address && Boolean(formik.errors.address)}>
                            {/* <InputLabel htmlFor="address">Address</InputLabel> */}
                            <TextareaAutosize
                                id="address"
                                name="address"
                                minRows={3} // Minimum rows to display
                                maxRows={6} // Maximum rows before scrolling
                                placeholder="Enter address..."
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ width: '100%', resize: 'vertical' }}
                            // helperText={(formik.touched.address && formik.errors.address) || ' '}
                            />
                            {/* Error message for address input */}
                            {formik.touched.address && formik.errors.address && (
                                <div style={{ color: 'red' }}>{formik.errors.address}</div>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <FormControl fullWidth variant="outlined" error={formik.touched.country && Boolean(formik.errors.country)}>
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                labelId="country-label"
                                label="Country"
                                value={formik.values.country}
                                onChange={handleCountryChange}
                            >
                                {countries.map((country, index) => (
                                    <MenuItem key={index} value={country.value}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* <FormHelperText>Error</FormHelperText> */}
                            {(formik.touched.country && formik.errors.country) && (
                                <div style={{ color: 'red' }}>{formik.errors.country}</div>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} xl={6}>
                        <FormControl fullWidth variant="outlined" error={formik.touched.state && Boolean(formik.errors.state)}>
                            <InputLabel id="state-label">State</InputLabel>
                            <Select
                                labelId="state-label"
                                label="State"
                                value={formik.values.state}
                                onChange={handleStateChange}
                            >
                                {states.map((state, index) => (
                                    <MenuItem key={index} value={state.value}>
                                        {state.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {(formik.touched.state && formik.errors.state) && (
                                <div style={{ color: 'red' }}>{formik.errors.state}</div>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} xl={6}>
                        <FormControl fullWidth variant="outlined" error={formik.touched.city && Boolean(formik.errors.city)}>
                            <InputLabel id="city-label">City</InputLabel>
                            <Select
                                labelId="city-label"
                                label="City"
                                value={formik.values.city}
                                onChange={handleCityChange}
                            >
                                {cities.map((city, index) => (
                                    <MenuItem key={index} value={city.value}>
                                        {city.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {(formik.touched.city && formik.errors.city) && (
                                <div style={{ color: 'red' }}>{formik.errors.city}</div>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Pincode"
                                name="pincode"
                                value={formik.values.pincode}
                                onChange={formik.handleChange}
                                onKeyDown={handlePincodeKeyDown}
                                onKeyPress={(e) => {
                                    // Prevent typing after reaching 6 characters
                                    if (formik.values.pincode.length >= 6) {
                                        e.preventDefault();
                                    }
                                }}
                                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            // helperText={(formik.touched.pincode && formik.errors.pincode) || ' '}
                            />
                            {(formik.touched.pincode && formik.errors.pincode) && (
                                <div style={{ color: 'red' }}>{formik.errors.pincode}</div>
                            )}
                        </FormControl>
                    </Grid>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                        Update
                    </Button>
                </Grid>
            </form>
        </Container>
    );
}