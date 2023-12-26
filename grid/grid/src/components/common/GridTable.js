import { Box, Grid, Button, Container, Hidden, Table, TableBody, IconButton, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


export default function GridTable() {

    const [data, setdata] = useState([]);
    const [isAutoSyncOn, setIsAutoSyncOn] = useState(false);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000');
            setdata(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('error:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const fetchAndSyncData = async () => {
            if (isAutoSyncOn) {
                console.log("sync is on");
                await fetchData();
            }
        };

        const interval = setInterval(fetchAndSyncData, 30000); // Every 2 minutes for ( 30secs -> 30000)

        return () => clearInterval(interval);
    }, [isAutoSyncOn]);
    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000');
    //         setdata(response.data);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('error:', error);
    //     }
    // };
    // useEffect(() => {
    //     const fetchdata = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000');
    //             setdata(response.data);
    //             console.log(response.data);
    //             console.log(response.data);
    //         }
    //         catch (error) {
    //             console.error('error:', error);
    //         }
    //     }
           
    //     // Start Auto Sync on component mount    
    //     const interval = setInterval(() => {
    //         if (isAutoSyncOn) {
    //             fetchdata();
    //         }
    //     }, 30000); // Every 2 minutes
    //     return () => clearInterval(interval);
        
    // }, []);

   
        // Start Auto Sync on component mount    
    //     const interval = setInterval(() => {
    //         if (isAutoSyncOn) {
                
    //         }
    //     }, 120000); // Every 2 minutes
    //     return () => clearInterval(interval);
    
    

    const navigate = useNavigate();

    const handleEditClick = (row) => {
        navigate(`/editdetails?id=${row.id}`, { state: { rowData: row } });
    };
    const handleDeleteClick = async (row) => {
        try {
            const response = await axios.delete(`http://localhost:5000/deletehospital/${row.id}`);
            if (response.status === 200) {
                // If deletion is successful, you might want to update the UI or refetch the data
                setdata(prevData => prevData.filter(item => item.id !== row.id));
            } else {
                // Handle other cases, e.g., deletion failed
                console.error('Failed to delete');
            }
        }
        catch (error) {
            console.error('Error deleting:', error);
            // Handle error cases here
        }
    }
    return (
        <Container maxWidth="xl" sx={{ p: 1,  }}>
            <Grid container sx={{ mt: 2 }} justifyContent="flex-end">
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Link to="/hospitaldetails" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" fullWidth>Add</Button>
                    </Link>
                </Grid>
            </Grid>
            <Hidden mdUp>
                {data.map((row) => (
                    <Grid key={row.id} container spacing={2}>
                        <Grid item xs={6}>
                            {/* Display labels */}
                            <div>ID</div>
                            <div>Hospital Name</div>
                            <div>Hospital Short Name</div>
                            <div>Hospital Email</div>
                            <div>Hospital Address</div>
                            <div>Country</div>
                            <div>State</div>
                            <div>City</div>
                            <div>Pin Code</div>
                            <div>Hospital Logo</div>
                            <div>Edit</div>
                            <div>Delete</div>
                            {/* ... other columns */}
                        </Grid>
                        <Grid item xs={6}>
                            {/* Display corresponding data */}
                            {/* <div>{row.id}</div>
                                <div>{row.name}</div> */}
                            <div>{row.id}</div>
                            <div>{row.name}</div>
                            <div>{row.shortname}</div>
                            <div>{row.email}</div>
                            <div>{row.address}</div>
                            <div>{row.country}</div>
                            <div>{row.state}</div>
                            <div>{row.city}</div>
                            <div>{row.pincode}</div>
                            <div>
                                {row.file && (
                                    <img src={`http://localhost:5000/images/${row.file}`} alt='Hospital Logo' width={100} height={100} />
                                )}
                            </div>
                            <div>
                                <IconButton onClick={() => handleEditClick(row)}>
                                    <ModeEditOutlineIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton onClick={() => handleDeleteClick(row)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            {/* ... other columns */}
                        </Grid>
                    </Grid>
                ))}
            </Hidden>
            <Hidden smDown md={false}>
                <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={12} xl={12}>
                        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                            <Table aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        {/* ... table headers ... */}
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
                                        <TableRow key={row.id}>
                                            {/* ... table cells ... */}

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
                        </TableContainer>
                    </Grid>
                </Grid>
            </Hidden>
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
               {/* Example to show whether Auto Sync is On or Off */}
        {/* <Box>
            {isAutoSyncOn ? (
                <p>Auto Sync is currently On</p>
            ) : (
                <p>Auto Sync is currently Off</p>
            )}
        </Box> */}
        </Container>
    );
}