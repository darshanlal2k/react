
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, Typography, Button } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function Fileupload() {
    const validationSchema = yup.object().shape({
        file: yup.mixed().required('Please choose a file'),
    });

    const formik = useFormik({
        initialValues: {
            file: null,
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            const formData = new FormData();
            formData.append('file', values.file);

            try {// need to write ip address of EC@ instance
                const response = await fetch('http://ec2-instance-ip:3000/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
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
                console.error('Error uploading file', error);
                setErrors({ file: 'Error uploading file' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Button variant="outlined" size='medium' startIcon={<FileUploadOutlinedIcon />}>
                    <Input
                        type="file"
                        name="file"
                        hidden
                        styles={{ display: "none" }}
                        onChange={(event) => {
                            formik.setFieldValue('file', event.currentTarget.files[0]);
                        }}
                    />
                </Button>

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

