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
    const [searchQuery, setSearchQuery] = useState('');
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

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

    const filteredCars=carData.filter(car=>
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className=' mx-4 my-4'>
    <div className='flex flex-col items-center justify-center mb-4'>
      
      <h3 className='text-2xl font-bold'>Available Cars</h3>

      <div className='mb-6'>
      <input
          type="text"
          placeholder="Search by make or model"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full my-2 p-2  border border-gray-300 rounded-2xl"
        />

      </div>
      </div>
      <div className='flex flex-wrap justify-center'>
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {filteredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <p>No cars match your search.</p>
      )}
      </div>
        {/* {carData.map((car) => (
        <CarCard key={car._id} car={car} />
      ))} */}
  
    </div>

)}

export default Car