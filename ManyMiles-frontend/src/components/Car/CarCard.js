import React from 'react'

const CarCard = ({car}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
    <img className="w-full h-48 object-cover" src={car.photos[0] || 'https://via.placeholder.com/300'} alt={car.model} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl text-gray-900 dark:text-white">{car.make} {car.model}</div>
      <p className="text-gray-700 text-base dark:text-gray-200">
        {car.description.length > 100 ? car.description.slice(0, 100) + '...' : car.description}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">${car.pricePerDay} / day</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Details
        </button>
      </div>
    </div>
  </div>
  )
}

export default CarCard