/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const BookServices = () => {
    const loadedServices = useLoaderData();
    const{title, price,_id,img} = loadedServices;
    const {user} = useContext(AuthContext)

    const handleBookService = (event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = user?.email;
        const date = form.date.value;

        const booking ={
            customerName: name,
            customerEmail: email,
            date,
            img,
            service: title,
            service_id:_id,
            price: price
        }
        console.log(booking);

        fetch('https://newcar-project.vercel.app/bookings',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.insertedId){
                alert('Booking Confirmed')
            }
        })
    }
    return (
        <div>
             <div>
        
        <p className='text-center text-3xl'>Book Services: {title}</p>
        <form onSubmit={handleBookService}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
        <div className="form-control">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input type="text" name='name' defaultValue={user?.displayName} placeholder="name" className="input input-bordered" />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Date</span>
      </label>
      <input type="date" name='date'  placeholder="date" className="input input-bordered" />
    </div>
        <div className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input type="text" name='email' placeholder="email" defaultValue={user?.email} className="input input-bordered" />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Due Amount </span>
      </label>
      <input type="text" defaultValue={'$'+price} className="input input-bordered" />
    </div>
        </div>
    <div className="form-control mt-6">
      <input className="btn btn-primary btn-block" type="submit" value="Oder Confirm" />
    </div>
        </form>
  <div className="card-body">
    
  </div>
</div>
        </div>
    );
};

export default BookServices;