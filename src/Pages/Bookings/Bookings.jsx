/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import BookingRow from './BookingRow';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
    const {user} = useContext(AuthContext)
    const url = `https://newcar-project.vercel.app/bookings?email=${user?.email}`
    const[bookings,setBookings] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(url,{
            method: 'GET',
            headers:{
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            },
            body:JSON.stringify()
        })
        .then(response => response.json())
        .then(data=>{
            if(!data.error)
            {
              setBookings(data)
            }
            else{
                // ! logout and navigate to the homepage
                navigate('/');
            }
        })
    },[url,navigate])

    
    const handleDelete = (id)=>{
        const proceed = confirm('Are you sure you want to delete');
        if(proceed)
        {
            fetch(`https://newcar-project.vercel.app/bookings/${id}`,{
                method: 'DELETE'
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                if(data.deletedCount>0)
                {
                    alert('deleted successfully');
                    const remaining = bookings.filter(booking => booking._id !== id)
                    setBookings(remaining)
                }
            })
        }
    }

    const handleBookingConfirm = (id)=>{
        const proceed =confirm('Are you sure you want to confirm your booking');
        if(proceed)
        {
            fetch(`https://newcar-project.vercel.app/bookings/${id}`,{
                method:'PATCH',
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify({status: 'confirm'})
            })
            .then((res)=> res.json())
            .then((data)=>{
                console.log(data);
                if(data.modifiedCount > 0)
                {
                    // update state 
                    const remaining = bookings.filter(booking =>booking._id !== id);
                    const updated =   bookings.find(booking =>booking._id  === id);
                    updated.status = 'confirm';
                    const newBookings = [updated,...remaining];
                    setBookings(newBookings); 
                }
            })
        }
    }



    return (
        <div>
            <h2 className="text-5xl">Yours Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Service Image</th>
        <th>Service Name</th>
        <th>Date</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
        {
            bookings.map((booking) =><BookingRow
             key={booking._id}
              booking={booking}
              handleDelete={handleDelete}
              handleBookingConfirm={handleBookingConfirm}
             ></BookingRow>)
        }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Bookings;