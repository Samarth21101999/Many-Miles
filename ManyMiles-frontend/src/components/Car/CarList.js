import React, { useState } from 'react';
import CarCard from './CarCard'; // Assuming you have a CarCard component

const CarList = ({ cars }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter cars based on the search query
  const filteredCars = cars.filter((car) => {
    return (
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      {/* Search Bar */}
      <div className="search-container mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by make or model"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Car Cards */}
      <div className="car-list">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p>No cars found</p>
        )}
      </div>
    </div>
  );
};

export default CarList;
