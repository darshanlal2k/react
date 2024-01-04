// import react, react-router, material ui, formik,yup,axios, country-state-city, file upload , react -toastify

import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Select, InputLabel, MenuItem, TextField, FormControl } from '@mui/material';
import { useState, useEffect, React } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function EditDetails() {


    const location = useLocation();
    const { rowData } = location.state || {};

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    // to fetch all countries list
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
    // on change in country changes by user
    const handleCountryChange = (event) => {
        // console.log(event);
        const selectedCountry = event.target.value;
        // console.log(selectedCountry);
        formik.setFieldValue('country', selectedCountry);

        // Fetch and set states based on selected country
        const fetchedStates = State.getStatesOfCountry(selectedCountry).map((state) => ({
            label: state.name,
            value: state.isoCode,
        }));
        // console.log(fetchedStates);
        setStates(fetchedStates);
    };
    // is used to change state change by user
    const handleStateChange = (event) => {
        // console.log(event);
        const selectedState = event.target.value;
        // console.log(selectedState);
        formik.setFieldValue('state', selectedState);

        const countryCode = formik.values.country; // Get selected country code

        // console.log(countryCode);
        // Fetch and set cities based on selected state
        const fetchedCities = City.getCitiesOfState(countryCode, selectedState).map((city) => ({
            label: city.name,
            value: city.name,
        }));
        // console.log(fetchedCities);
        setCities(fetchedCities);
        // formik.setFieldValue('city', '');
    };
    // is used to handle city changes by user
    const handleCityChange = (event) => {
        formik.setFieldValue('city', event.target.value);
    };

    // yup is used for validation for inputs or controls
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
    // is used to check pincode 
    const handlePincodeKeyDown = (event) => {
        const isNumber = /^\d$/; // Regular expression to check for numbers
        const isAllowedKey = event.key === 'Backspace' || event.key === 'Delete';

        if (!isNumber.test(event.key) && !isAllowedKey) {
            event.preventDefault(); // Prevents typing non-numeric characters
        }
    };
    // is used to navigate one componen to another component
    const navigate = useNavigate();
    // is used to formik for form values 
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

            setIsSubmitting(true);
            try {
                console.log(values);
                // to disply updated successfully toast message in top of the page
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
    // is used to file change 
    const handleFileChange = (event) => {
        formik.setFieldValue('file', event.currentTarget.files[0]);
    };

    return (
        <div className="p-5">
            <ToastContainer />
            <div className="bg-white p-2">
                <h2 className="text-2xl font-semibold text-center mb-4">Edit Hospital Details</h2>
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1  gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {/* Hospital Legal Name - Darshan */}
                    <div className="col-span-1">
                        <TextField
                            label="Hospital Legal Name"
                            variant="outlined"
                            name="name"
                            fullWidth
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name)}
                            inputProps={{
                                onKeyDown: (event) => {
                                    if (event.key.match(/[0-9]/)) {
                                        event.preventDefault();
                                    }
                                }
                            }}
                        />
                    </div>
                    {/* Hospital Short Name - Darshan */}
                    <div className="col-span-1">
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
                    </div>
                    {/* Hospital Logo - Darshan */}
                    <div className="col-span-1">
                        <FormControl fullWidth>
                            <Button variant="outlined" component="label" size='medium' startIcon={<FileUploadOutlinedIcon />}
                                sx={{ pt: 2, pb: 1.5, textAlign: 'center', color: 'solid rgb(196,196,196,1)', border: '1px solid rgb(196,196,196,1)' }}
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
                        </FormControl>
                    </div>
                    {/* Hospital Email - Darshan */}
                    <div className="col-span-1">
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={(formik.touched.email && formik.errors.email)}
                            inputProps={{
                                onKeyDown: (event) => {
                                    if (event.key.match(/[0-9]/)) {
                                        event.preventDefault();
                                    }
                                }
                            }}
                        />
                    </div>
                    {/* Hospital Address - Darshan */}
                    <div className="col-span-1">
                        <TextField
                            label="Address"
                            variant="outlined"
                            name="address"
                            fullWidth
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={(formik.touched.address && formik.errors.address)}
                            inputProps={{
                                onKeyDown: (event) => {
                                    if (event.key.match(/[0-9]/)) {
                                        event.preventDefault();
                                    }
                                }
                            }}
                        />
                    </div>
                    {/* Hospital Country - Darshan */}
                    <div className="col-span-1">
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
                        </FormControl>
                    </div>
                    {/* Hospital State - Darshan */}
                    <div className="col-span-1">
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
                        </FormControl>
                    </div>
                    {/* Hospital City - Darshan */}
                    <div className="col-span-1">
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
                        </FormControl>
                    </div>
                    {/* Hospital Pincode - Darshan */}
                    <div className="col-span-1">
                        <TextField
                            label="Pincode"
                            variant="outlined"
                            name="pincode"
                            fullWidth
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyDown={handlePincodeKeyDown}
                            onKeyPress={(e) => {
                                // Prevent typing after reaching 6 characters
                                if (formik.values.pincode.length >= 6) {
                                    e.preventDefault();
                                }
                            }}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={(formik.touched.pincode && formik.errors.pincode)}
                        />
                    </div>
                    {/* Update Button - Darshan */}
                    <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-4 text-center ">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type='submit'
                            disabled={isSubmitting}
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}