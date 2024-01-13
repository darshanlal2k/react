
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, Typography, Button } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import axios from 'axios';

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
        
        <div className="min-h-screen flex items-center justify-center">

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
        </div>
    )
}

