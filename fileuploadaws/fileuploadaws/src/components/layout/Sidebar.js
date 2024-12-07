import React from 'react'
import grouplogo from '../common/images/homelogo.jpg';
import maskgrouplogo from '../common/images/Maskgrouplogo.png';
import hospitallogo from '../common/images/sihalogo.jpg';
import hospitallogos from '../common/images/sidebarapplogo.jpg';
import sihalogo from '../common/images/sihalogos.png';
import Divider from '@mui/material/Divider';

export default function Sidebar() {
    return (
        <div className='h-full '>
            <div className=' p-4 h-20 ml-5'>
                <img src={sihalogo} alt='users_logo' />
            </div>
            <div className='text-white p-2 ml-5'>
                <div className='flex p-4 '>
                    <img src={maskgrouplogo} alt='users_logo' className='mr-5' />
                    <p className=''>Home</p>
                </div>
                <div className='flex p-4 text-center'>
                    <img src={maskgrouplogo} alt='users_logo' className='mr-5' />
                    <p className=''>Configurations</p>
                </div>
                <div className='flex p-4 text-center'>
                    <img src={maskgrouplogo} alt='users_logo' className='mr-5' />
                    <p className=''>Email Templates</p>
                </div>
                <div className='flex p-4 text-center'>
                    <img src={maskgrouplogo} alt='users_logo' className='mr-5' />
                    <p className=''> Notificaiton Templates</p>
                </div>

                <Divider className='text-white' />
                <div className='flex p-4 text-center mt-5'>
                    <img src={maskgrouplogo} alt='users_logo' className='mr-5' />
                    <p className=''>Invite</p>
                </div>
            </div>
        </div>
    )
}
