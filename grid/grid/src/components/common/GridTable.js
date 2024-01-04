// import material ui axios react-router-dom
import { Box, Grid, Button, Container, Table, TableBody, IconButton, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Paper from '@mui/material/Paper';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';

export default function GridTable() {

    const [data, setdata] = useState([]); // data receives from backend - Darshan
    const [isAutoSyncOn, setIsAutoSyncOn] = useState(false); // used for reload - Darshan

    // fetch data from backend using get methods - Darshan 
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000');
            setdata(response.data); // parameter , which data passes to set data function we can access using (data) - Darshan
            console.log(response.data);
        } catch (error) {
            console.error('error:', error);
        }
    };
    // useEffect -> our component needs to do something after render
    useEffect(() => {
        fetchData();
        
        // used to fetch and sync data or reload 
        const fetchAndSyncData = async () => {
            if (isAutoSyncOn) {
                console.log("sync is on");
                await fetchData();
            }
        };

        const interval = setInterval(fetchAndSyncData, 30000); // Every 30 seconds it will refresh the page  for ( 30secs -> 30000) - Darshan

        return () => clearInterval(interval);
    }, [isAutoSyncOn]);

    const navigate = useNavigate();

    // its edit and  navigateing to editdetails.js file - Darshan
    const handleEditClick = (row) => {
        navigate(`/editdetails?id=${row.id}`, { state: { rowData: row } });
    };

    // its will delete the row  - Darshan
    const handleDeleteClick = async (row) => {
        try {
            const response = await axios.delete(`http://localhost:5000/deletehospital/${row.id}`);
            if (response.status === 200) {
                setdata(prevData => prevData.filter(item => item.id !== row.id));
            } else {
                console.error('Failed to delete');
            }
        }
        catch (error) {
            console.error('Error deleting:', error);
        }
    }
    return (
        <Container maxWidth="xl" className='p-5'>
             {/* Add Hospital button  - Darshan */}
            <Box className="text-center m-5">
                <Link to="/hospitaldetails" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type='submit'
                    >
                        Add Hospital
                    </Button>
                </Link>
            </Box>
            {/* Table  md,lg,xl,2xl will display  - Darshan*/}
            <Box className="hidden md:block">
                <Table>
                    <TableHead className='border border-red-700'>
                        <TableRow >
                            <TableCell>ID</TableCell>
                            <TableCell>Hospital Name</TableCell>
                            <TableCell>Hospital Short Name</TableCell>
                            <TableCell>Hospital Email</TableCell>
                            <TableCell>Hospital Address</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Pin Code</TableCell>
                            <TableCell>Hospital Logo</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow className='border border-red-700' key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.shortname}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.country}</TableCell>
                                <TableCell>{row.state}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>{row.pincode}</TableCell>
                                <TableCell>
                                    {row.file && (
                                        <img src={`http://localhost:5000/images/${row.file}`} alt='Hospital Logo' width={100} height={100} />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(row)}>
                                        <ModeEditOutlineIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteClick(row)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            {/* Table only show in sm mobile only  - Darshan */}
            <Box className='md:hidden'>
                <Grid container >
                    <Grid item xs={12} md={12}>
                        {data.map((row) => (
                            <Paper key={row.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                                <div className='flex bg-sky-300 text-center'>
                                    <strong className='w-1/2'>ID</strong>
                                    <span className='w-1/2'>{row.id}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Hospital Name</strong>
                                    <span className='w-1/2'>{row.name}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Hospital Short Name</strong>
                                    <span className='w-1/2'>{row.shortname}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Hospital Email</strong>
                                    <span className='w-1/2'>{row.email}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Hospital Address</strong>
                                    <span className='w-1/2'>{row.address}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Country</strong>
                                    <span className='w-1/2'>{row.country}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>State</strong>
                                    <span className='w-1/2'>{row.state}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>City</strong>
                                    <span className='w-1/2'>{row.city}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Pin Code</strong>
                                    <span className='w-1/2'>{row.pincode}</span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2'>Hospital Logo</strong>
                                    <span className='w-1/2'>
                                        {row.file && (
                                            <img src={`http://localhost:5000/images/${row.file}`} alt='Hospital Logo' width={100} height={100} />
                                        )}
                                    </span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2 '>Edit</strong>
                                    <span className='w-1/2'>
                                        <IconButton onClick={() => handleEditClick(row)}>
                                            <ModeEditOutlineIcon />
                                        </IconButton>
                                    </span>
                                </div>
                                <div className='flex '>
                                    <strong className='w-1/2 '>Delete</strong>
                                    <span className='w-1/2'>
                                        <IconButton onClick={() => handleDeleteClick(row)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </span>
                                </div>
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            </Box>
            {/* sync button is used to on and off of interval timing  - Darshan */}
            <Box>
                <Container maxWidth={"xl"} sx={{ mt: 5, mb: 5 }}>
                    <Grid container justifyContent={'space-evenly'}>
                        <Grid item>
                            <Button variant='contained' onClick={() => setIsAutoSyncOn(true)}>Auto Sync On</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={() => setIsAutoSyncOn(false)}>Auto Sync Off</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Container>
    );
}