import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';



export default function GridTable() {

    const [data, setdata] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://localhost:5000');
                setdata(response.data);
                // console.log(response.data);
            }
            catch (error) {
                console.error('error:', error);
            }
        }
        fetchdata();
    }, []);
    return (
        <Box>
            <div className='align-right'>
                <Container>
                    <Link to="/hospitaldetails"><Button >Add</Button></Link>
                </Container>
            </div>

            <Container maxWidth="xl" >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {data.length > 0 && Object.keys(data[0]).map(key => (
                                    <TableCell key={key}>{key}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.companyname}</TableCell>
                                    <TableCell>{row.contact}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.countryname}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
}