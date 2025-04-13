import React from 'react'
import { useNavigate } from 'react-router';
const CarCard = ({car}) => {

  console.log(car.images[0])
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/car/${car._id}`)
    
        // Add your logic to handle the form submission here
  };
  return (
    <div className="max-w-sm  overflow-hidden shadow-lg  bg-white  rounded-2xl border border-gray-200 ">
    {/* <img className="w-full h-48 object-cover" src={car.photos[0] || 'https://via.placeholder.com/300'} alt={car.model} /> */}
    <div>
    <img className="w-full h-48 object-cover rounded-t-2xl" src={car.images[0] || 'https://via.placeholder.com/300'} alt={car.model} />
      <div className='p-4'>
      <div className="font-bold text-xl text-gray-900 ">{car.make} {car.model}</div>
      <p className="text-gray-700 text-base ">
        {car.description.length > 100 ? car.description.slice(0, 100) + '...' : car.description}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold text-gray-800 mx-4 ">${car.pricePerDay} / day</span>
        <button  onClick={handleSubmit} className=" cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl shadow-lg">
          View Details
        </button>
      </div>
      </div>
    </div>
  </div>
  )
}

export default CarCard