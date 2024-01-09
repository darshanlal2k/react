import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Paper, Container, Link } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Fetchdata() {

      // State hooks for form data and fetched data
    const [postData, setPostData] = useState({
        title: '',
        body: '',
        userId: ''
    });
    const [data, setdata] = useState([]); // data receives from backend - Darshan

    // Function to fetch data from the backend API
    const fetchData = async () => {
        try {
            const response = await axios.get('http://universities.hipolabs.com/search?country=United+States', {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'json',
            });
            if (response.status === 200) {
                setdata(response.data);
                console.log(response.data);
            } else if (response.status === 403) {
                console.error('Error: Forbidden (403)');
            } else if (response.status === 404) {
                console.error('Error: Not Found (404)');
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
            // parameter , which data passes to set data function we can access using (data) - Darshan

        } catch (error) {
            // Display error message to the user if needed
            if (error.response) {
                console.error('Error:', error.response.status, error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Network Error:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error:', error.message);
            }
        }
    };

      // Trigger the fetch function on component mount
    useEffect(() => {
        fetchData();
    }, []);

     // Function to handle changes in form inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

     // Function to handle form submission (POST request)
    const handlePost = async () => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                console.log('Data posted successfully:', response.data);
                // Perform any necessary actions after successful post
            } else if (response.status === 403) {
                console.error('Error: Forbidden (403)');
            } else if (response.status === 404) {
                console.error('Error: Not Found (404)');
            } else {
                throw new Error(`Failed to post data. Status code: ${response.status}`);
            }
        } catch (error) {
              // Display error message to the user if needed
              if (error.response) {
                // The request was made and the server responded with a status code
                // Other than 2xx (successful responses)
                console.error('Error :', error.response.status, error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Network Error:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error posting data:', error.message);
            }
        }
    };
    return (
        <Container maxWidth="xl" className='p-5'>
            <Box>
                <TextField
                    name="title"
                    label="Title"
                    value={postData.title}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    name="body"
                    label="Body"
                    value={postData.body}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    fullWidth
                />
                <TextField
                    name="userId"
                    label="User ID"
                    value={postData.userId}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Box className='text-center'>
                    <Button variant="contained"  onClick={handlePost}>
                        Post Data
                    </Button>
                </Box>
            </Box>
            <Box className="hidden md:block">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Short Name</TableCell>
                            <TableCell>Domains</TableCell>
                            <TableCell>Links</TableCell>
                            <TableCell>State Province</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.country}</TableCell>
                                <TableCell>{row.alpha_two_code}</TableCell>
                                <TableCell>{row.domains}</TableCell>
                                <TableCell>{row.web_pages}</TableCell>
                                <TableCell>{row.stateProvince}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box>

            </Box>
            <Box className='md:hidden'>
                {data.map((row, index) => (
                    <Paper key={index} elevation={6} className='m-3 p-5'>
                        <div className='flex bg-sky-300 font-bold'>
                            <span className='w-1/2 '>Name</span>
                            <span className='w-1/2'>{row.name}</span>
                        </div>
                        <div className='flex '>
                            <span className='w-1/2'>Country</span>
                            <span className='w-1/2'>{row.country}</span>
                        </div>
                        <div className='flex '>
                            <span className='w-1/2'>Short Name</span>
                            <span className='w-1/2'>{row.alpha_two_code}</span>
                        </div>
                        <div className='flex text-wrap'>
                            <p className='w-1/2'>Domains</p>
                            <p className='w-1/2'>
                                <div className='whitespace-normal'>
                                    {Array.isArray(row.domains) ? (
                                        row.domains.map(domain => (
                                            <Link
                                                key={domain}
                                                href={domain}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className={`inline-block ${domain.length > 5 ? 'break-all' : ''
                                                    }`}
                                            >
                                                {domain}
                                            </Link>
                                        ))
                                    ) : (
                                        <Link
                                            href={row.domains}
                                            target='_blank'

                                            className={`inline-block ${row.domains.length > 5 ? 'break-all' : ''
                                                }`}
                                        >
                                            {row.domains}
                                        </Link>
                                    )}
                                </div>
                            </p>
                        </div>
                        <div className='flex '>
                            <p className='w-1/2'>Links</p>
                            <p className='w-1/2'>
                                <div className='whitespace-normal'>
                                    {Array.isArray(row.web_pages) ? (
                                        row.web_pages.map((url, index) => (
                                            <Link
                                                key={index}
                                                href={url}
                                                target='_blank'

                                                className={`inline-block ${url.length > 5 ? 'break-all' : ''
                                                    }`}
                                            >
                                                {url}
                                            </Link>
                                        ))
                                    ) : (
                                        <Link
                                            href={row.web_pages}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={`inline-block ${row.web_pages.length > 5 ? 'break-all' : ''
                                                }`}
                                        >
                                            {row.web_pages}
                                        </Link>
                                    )}
                                </div>
                            </p>

                        </div>
                        <div className='flex '>
                            <span className='w-1/2'>State</span>
                            <span className='w-1/2'>{row["state-province"]}</span>
                        </div>
                    </Paper>
                ))}
            </Box>
            <Box>

            </Box>
        </Container>
    );
};
