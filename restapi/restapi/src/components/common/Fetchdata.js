import { Box, Table, TableBody, TableCell, TableHead, TableRow, Grid, Paper, Container, Link } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Fetchdata() {
    const [data, setdata] = useState([]); // data receives from backend - Darshan

    const fetchData = async () => {
        try {
            const response = await axios.get('http://universities.hipolabs.com/search?country=United+States', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setdata(response.data); // parameter , which data passes to set data function we can access using (data) - Darshan
            console.log(response.data);
        } catch (error) {
            console.error('error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Container maxWidth="xl" className='p-5'>
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
            {/* <Box className='md:hidden overflow-x-auto'>
                <Grid container className='whitespace-normal' >
                    <Grid item xs={12} md={12}>
                        {data.map((row, index) => (
                            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
                                <div className='flex  bg-sky-300'>
                                    <strong className='w-1/2'>Name</strong>
                                    <span className='w-1/2'>{row.name}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Country</strong>
                                    <span className='w-1/2'>{row.country}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Short Name</strong>
                                    <span className='w-1/2'>{row.alpha_two_code}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Domains</strong>
                                    <span className='w-1/2'>{row.domains}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Links</strong>
                                    <span className='w-1/2'>{row.web_pages}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>State</strong>
                                    <span className='w-1/2'>{row["state-province"]}</span>
                                </div>
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            </Box> */}
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
        </Container>
    );
};
