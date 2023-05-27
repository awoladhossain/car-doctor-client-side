/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {
    const [services, setServices] = useState([])
    useEffect(()=>{
        fetch('https://newcar-project.vercel.app/services')
        .then((res)=>res.json())
        .then((data)=>setServices(data))
    },[])
    return (
        <div className='mt-4'>
            <div className='text-center'>
                <h3 className="text-2xl font-bold text-orange-500">Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vel amet dignissimos maxime cum nihil <br /> adipisci placeat inventore impedit. Iure nobis ad sed dolorem illo.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map((service)=>{
                        return <ServicesCard key={service._id} service={service}></ServicesCard>
                    })
                }
            </div>
        </div>
    );
};

export default Services;