import React from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
export default function Navigationbar() {
    return (
        <div>
            <div className='flex bg-white'>
                <div className='w-3/4 text-xs font-bold'>
                    <p>{"Home > Configurations"}</p>
                </div>
                <div className='w-1/4 '>
                    <div className='flex justify-around'>
                        <div>
                            Greg House
                        </div>
                        <div>
                            <NotificationsOutlinedIcon />
                        </div>
                        <div>
                            <AccountCircleOutlinedIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}