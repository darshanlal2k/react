import { AppBar, Breadcrumbs, Link, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Header() {

    const breadcrumbs = [
        <Typography key="3" color="text.primary">
            Home
        </Typography>,
        <Typography key="3" color="text.primary">
            Configurations
        </Typography>,
    ];
    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    width: 1240,
                    ml: 1240,
                }}>
                <Toolbar className="bg-white ">
                    <Typography>
                        <div className='flex text-[#0BC5EA]'>
                            {/* <div>
                                home
                            </div>
                            <div>
                                icons
                            </div> */}
                            <Breadcrumbs className='text-[#0BC5EA]' separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

