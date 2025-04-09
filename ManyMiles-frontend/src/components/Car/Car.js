import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import CarCard from './CarCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Car = () => {
    const[carData,setCarData]=useState([])
    const [cookies] = useCookies(['accessToken']);
    useEffect(()=>{
        const getCar=async()=>{
            try{
                const token=cookies.accessToken;
                if(!token){
                    navigate("/login")
                }
                const response = await axios.get('http://localhost:5000/car/getAllCars', {
                    headers: {
                      'Authorization': `Bearer ${cookies.accessToken}`
                    },
                    withCredentials: true
                  });
                if(response.status!=200){
                    const errorData = await response.json();  
                    setError(errorData.message || 'Login Failed');
                    return;
                }
                const data = await response.data;
                console.log(data)
                setCarData(data)
          
            }catch(error){
                toast.error('Failed to fetch profile. Please try again.');
            }
        }
        getCar();
    },[])

  return (
    <div className='flex flex-wrap gap-4 mx-4 my-4'>
        {carData.map((car) => (
        <CarCard key={car._id} car={car} />
      ))}
  
    </div>

)}

export default Car