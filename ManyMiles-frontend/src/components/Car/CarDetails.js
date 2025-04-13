import React, { useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarDetails = () => {
    const { id } = useParams(); // Assuming you are using react-router for routing
    const [carDetails, setCarDetails] = React.useState(null);
     const [cookies] = useCookies(['accessToken']);
     const [modalImage, setModalImage] = useState(null);
    useEffect(() => {
        // Fetch car details based on the car ID from the URL or state
        // Use axios to make a GET request to your API endpoint
        // Example: axios.get(`http://localhost:5000/car/${carId}`)
        // Handle the response and set the car details in state
        // Don't forget to handle errors
        // and loading states as well
        // Example: setLoading(false) after fetching data
        

        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/car/getCar/${id}`,{
                headers: {
                    'Authorization': `Bearer ${cookies.accessToken}`,
                  },
                  withCredentials: true,
                });
                if (response.status !== 200) {
                    throw new Error('Failed to fetch car details');
                }else{
                    console.log(response.data)
                    setCarDetails(response.data);
                }
                // setCarDetails(response.data);
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        }
        fetchCarDetails();    
    }
    , []);
  return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {carDetails ? (
            <div className="space-y-4">
              {/* Title */}
              <h1 className="text-3xl font-bold">{carDetails.make} {carDetails.model} ({carDetails.year})</h1>
      
             <div className="max-w-4xl mx-auto">
            <div className="w-1/2">
                <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                showStatus={false}
                dynamicHeight={false}
                emulateTouch
                className="rounded-md"
                >
                {carDetails.images?.map((img, idx) => (
                    <div key={idx} className="h-[400px]">
                    <img
                        src={img}
                        alt={`Car ${idx + 1}`}
                        className="object-fill w-full h-full rounded-md cursor-pointer"
                        onClick={() => setModalImage(img)}
                    />
                    </div>
                ))}
                </Carousel>
  </div>
</div>

          

          {/* Modal for full screen image */}
          {modalImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={() => setModalImage(null)}
            >
              <img src={modalImage} alt="Full View" className="max-h-[90vh] max-w-[90vw] rounded-md shadow-lg" />
            </div>
          )}
      
              {/* License and Description */}
              <p><strong>License Plate:</strong> {carDetails.licensePlate}</p>
              <p><strong>Description:</strong> {carDetails.description}</p>
              <p><strong>Price per Day:</strong> ${carDetails.pricePerDay}</p>
      
              {/* Location */}
              <p><strong>Location:</strong> {carDetails.location.address}, {carDetails.location.city}, {carDetails.location.state}, {carDetails.location.zipCode}</p>
      
              {/* Insurance */}
              {carDetails.insurance && (
                <div>
                  <strong>Insurance:</strong>
                  <ul className="list-disc ml-6">
                    {Object.entries(carDetails.insurance).map(([key, value]) => (
                      <li key={key}><strong>{key}:</strong> {value.toString()}</li>
                    ))}
                  </ul>
                </div>
              )}
      
              {/* Availability */}
              {carDetails.availability?.length > 0 && (
                <div>
                  <strong>Availability:</strong>
                  <ul className="list-disc ml-6">
                    {carDetails.availability.map((slot, index) => (
                      <li key={index}>
                        From <strong>{new Date(slot.startDate).toLocaleDateString()}</strong> at <strong>{slot.startTime}</strong> to <strong>{new Date(slot.endDate).toLocaleDateString()}</strong> at <strong>{slot.endTime}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
      
              {/* Reviews */}
              {carDetails.reviews?.length > 0 && (
                <div>
                  <strong>Reviews:</strong>
                  <ul className="list-disc ml-6">
                    {carDetails.reviews.map((review, idx) => (
                      <li key={idx}>
                        "{review.comment}" — <em>{review.rating}★</em>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
      
              {/* Book Button */}
              <button
                onClick={() => alert('Booking flow goes here')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Book This Car
              </button>
            </div>
          ) : (
            <div className="text-center text-lg">Loading car details...</div>
          )}
        </div>
  )
}

export default CarDetails