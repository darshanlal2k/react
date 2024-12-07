
import React from 'react';
import { useFormik } from 'formik';
// import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
// import SearchIcon from "@material-ui/icons/Search";
import './Fileupload.css';
import * as yup from 'yup';
import { Input, Typography, Image, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField, AppBar, Toolbar, Drawer, Box } from '@mui/material';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import axios from 'axios';
import Sidebar from '../layout/Sidebar';
import Navigationbar from '../layout/Navigationbar';
import Tableview from '../layout/Tableview';
import SearchIcon from '@mui/icons-material/Search';

import grouplogo from './images/userslogo.png';
import hospitallogo from './images/hospitalimg.png';
import hospitallogos from './images/hospilogo.png';
import addhospitallogo from './images/addhospitalbtn.png';
import sihalogo from './images/sihalogos.png';
import Header from '../layout/Header';


// React component for file upload
export default function Fileupload() {
    // Validation schema using yup
    const validationSchema = yup.object().shape({
        file: yup.mixed().required('Please choose a file'),
    });
    // Formik configuration for form state and submission
    const formik = useFormik({
        initialValues: {
            file: null,
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            const formData = new FormData();
            formData.append('file', values.file);
            // Send a POST request to the server with the file data
            try {// need to write ip address of EC2 instance
                const response = await axios.post('http://ec2-instance-ip:3000/upload', formData);
                // Handle server response
                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
                    // Handle different HTTP status codes and set errors
                    const errorMessage =
                        response.status === 403
                            ? 'Permission Denied: You do not have the necessary rights.'
                            : response.status === 404
                                ? 'Endpoint Not Found: The server could not find the requested endpoint.'
                                : 'Error uploading file';

                    console.error(errorMessage);
                    setErrors({ file: errorMessage });
                }
            } catch (error) {
                // Handle network or other errors during file upload
                console.error('Error uploading file', error);
                setErrors({ file: 'Error uploading file' });
            } finally {
                // Reset the submitting state
                setSubmitting(false);
            }
        },
    });
    // JSX structure for the file upload form
    return (
        <div className=''>
            <div className='flex'>
                <div className='w-1/5 bluecolor' >
                    <Sidebar />
                </div>
                <div className='w-4/5'>
                    <div className='p-3 text-[#0BC5EA]'>
                        <Navigationbar />
                        <div className='text-2xl font-bold'>
                            Configurations
                        </div>
                    </div>
                    <div className='sectionBgclr '>
                        <div className='flex p-4'>
                            <div className='w-3/6 '>
                                <div className='flex'>
                                    <div className='w-1/2'>
                                        <img src={hospitallogo} alt='hospital_logo' />
                                    </div>
                                    <div className='w-1/2 text-[#0BC5EA]'>
                                        <img src={grouplogo} alt='users_logo' />
                                        Users
                                    </div>
                                </div>
                            </div>
                            <div className='w-3/6 '>
                                <div className='flex justify-between'>
                                    <div className='w-3/4 p-4'>
                                        <TextField
                                            label="search"
                                            size='small'
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        {/* <IconButton> */}
                                                        <SearchIcon />
                                                        {/* </IconButton> */}
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className='w-1/4'>
                                        <div className='mt-3'>
                                            <img src={addhospitallogo} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='p-4'>
                            <Tableview />
                        </div>
                        {/* <div className="min-h-screen flex items-center justify-center">
                            <form
                                onSubmit={formik.handleSubmit}
                                className="max-w-md w-full p-6 bg-white text-center rounded-md shadow-lg"
                            >
                                <div className='mb-3'>
                                    <h3>File Upload</h3>
                                </div>
                                <div className="mb-6 ">
                                    <Button
                                        variant="outlined"
                                        size="medium"
                                        startIcon={<FileUploadOutlinedIcon />}
                                        className="w-full"
                                    >
                                        <Input
                                            type="file"
                                            name="file"
                                            hidden
                                            onChange={(event) => {
                                                formik.setFieldValue('file', event.currentTarget.files[0]);
                                            }}
                                        />
                                    </Button>
                                </div>

                                {formik.errors.file && formik.touched.file && (
                                    <Typography color="error">{formik.errors.file}</Typography>
                                )}

                                {formik.isSubmitting && <Typography>Uploading...</Typography>}

                                <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
                                    Upload
                                </Button>

                                {formik.errors.file && !formik.isSubmitting && (
                                    <Typography color="error">{formik.errors.file}</Typography>
                                )}
                            </form>
                        </div> */}
                    </div>
                </div>
                {/* </div> */}

            </div>
            {/* <div>
                <AppBar >
                    <Toolbar>
                        Home
                    </Toolbar>
                </AppBar>
            </div> */}
        </div>
        // <Box className='flex'>
        //     <Header />
        //     <Sidebar />
        //     <Box
        //         component="main"
        //         sx={{
        //             flexGrow: 1,
        //             p: 3,
        //             width: 240,
        //             background: "#efecec",
        //             position: "fixed",
        //             height: "100%",
        //             right: "0",
        //         }}
        //     >
        //         <div className="mt-16   w-full overflow-scroll mb-5 h-full"></div>
        //     </Box>
        // </Box >
    );
}

