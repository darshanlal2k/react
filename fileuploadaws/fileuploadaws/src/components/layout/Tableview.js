import React from 'react';
import { Input, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const StyledTableRow = styled(TableRow)(({ theme, isOdd }) => ({
//     backgroundColor: isOdd ? theme.palette.primary.main : theme.palette.background.default,
// }));

// const useStyles = makeStyles({
//     oddRow: {
//         backgroundColor: 'skyblue',
//     },
//     evenRow: {
//         backgroundColor: 'white',
//     },
// });

import editlogo from '../common/images/Vectoredit.png';

export default function Tableview() {
    // const classes = useStyles();
    // const rows = [
    //     { id: 1, name: 'Darshan', age: 24 },
    //     { id: 2, name: 'alex', age: 30 },
    //     { id: 3, name: 'alex pandian', age: 30 },
    //     // Add more rows as needed
    // ];
    return (
        <div>
            <Table className='bg-white rounded-md'>
                <TableHead>
                    <TableRow className='text-weight'>
                        <TableCell>HOSPITAL</TableCell>
                        <TableCell>NO. OF USERS</TableCell>
                        <TableCell>NO. OF PATIENTS</TableCell>
                        <TableCell>HOSPITAL ADMIN</TableCell>
                        <TableCell>STATUS</TableCell>
                        <TableCell>ACTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <TableCell>1</TableCell>
                        <TableCell>alex</TableCell>
                        <TableCell>24</TableCell>
                        <TableCell>Frank</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <img src={editlogo} />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>2</TableCell>
                        <TableCell>Darshan Lal</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>Martin Frank</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <img src={editlogo} />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>3</TableCell>
                        <TableCell>alex pandian</TableCell>
                        <TableCell>26 </TableCell>
                        <TableCell>Frank</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <img src={editlogo} />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>1</TableCell>
                        <TableCell>alex</TableCell>
                        <TableCell>24</TableCell>
                        <TableCell>Frank</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <img src={editlogo} />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>2</TableCell>
                        <TableCell>Darshan Lal</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>Martin Frank</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <img src={editlogo} />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>3</TableCell>
                        <TableCell>alex pandian</TableCell>
                        <TableCell>26 </TableCell>
                        <TableCell>Frank</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <img src={editlogo} />
                        </TableCell>
                    </TableRow>
                    {/* <TableRow >
                        <TableCell>1</TableCell>
                        <TableCell>alex</TableCell>
                        <TableCell>24</TableCell>
                        <TableCell>Frank</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <img src={editlogo} />
                        </TableCell>
                    </TableRow> */}
                    <TableRow >
                        <TableCell>2</TableCell>
                        <TableCell>Darshan Lal</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>Martin Frank</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <img src={editlogo} />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>3</TableCell>
                        <TableCell>alex pandian</TableCell>
                        <TableCell>26 </TableCell>
                        <TableCell>Frank</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <img src={editlogo} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}