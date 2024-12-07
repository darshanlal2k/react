import { Container, Typography, TextField, Grid, FormControl, Button } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required')
        .matches(/^[a-zA-Z\s]*$/, 'Only letters and spaces are allowed')
        .min(3, 'Username should be at least 3 characters')
        .max(50, 'Username should not exceed 50 characters')
    ,
    password: Yup.string().required('Password is required')
        .min(8, 'Password should be at least 8 characters'),
});
export const Login = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log('Form submitted:', values);
            try {
                console.log('Form submitted:', values);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    })
    return (
        <div>

            <Container sx={{ mx: 'auto' }} >
                <ToastContainer />
                <Typography variant="h5" component="h2" sx={{
                    textAlign: "center",
                    color: 'blue',
                    fontWeight: 600,
                }}>
                    Log in
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} m={1} >
                        <Grid item xs={12} xl={6}>  
                            <FormControl fullWidth>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    name="username"
                                    fullWidth
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={(formik.touched.username && formik.errors.username)}
                                    inputProps={{
                                        onKeyDown: (event) => {
                                            if (event.key.match(/[0-9]/)) {
                                                event.preventDefault();
                                            }
                                        }
                                    }}
                                />
                                {/* {formik.touched.name && formik.errors.name && (
                <div style={{ color: 'red' }}>{formik.errors.name}</div>
              )} */}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="password"
                                    variant="outlined"
                                    name="password"
                                    type='password'
                                    fullWidth
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={(formik.touched.password && formik.errors.password)}
                                    // inputProps={{
                                    //     onKeyDown: (event) => {
                                    //         if (event.key.match(/[0-9]/)) {
                                    //             event.preventDefault();
                                    //         }
                                    //     }
                                    // }}
                                />
                                {/* {formik.touched.shortname && formik.errors.shortname && (
                <div style={{ color: 'red' }}>{formik.errors.shortname}</div>
              )} */}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            {/* <Link to="/gridtable" style={{ textDecoration: 'none', color: 'inherit' }}> */}
                            <Button variant="contained" color="primary" type="submit">Submit
                            </Button>
                            {/* </Link> */}

                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    )
}
