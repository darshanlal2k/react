import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const GridTable = () => {

    const [data, setdata] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://localhost:5000');
                setdata(response.data);
                console.log(response.data);
                console.log();
            }
            catch (error) {
                console.error('error:', error);
            }
        }
        fetchdata();
    }, []);

    return (
        <TableContainer>
            <Table>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default GridTable

{/* {data.map(
                        obj => object.keys(obj)
                    )}
                    <TableRow>
                        <TableCell>Heading</TableCell>
                    </TableRow> */}