import React, { useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
const CarDetails = () => {
    const { id } = useParams(); // Assuming you are using react-router for routing
    const [carDetails, setCarDetails] = React.useState(null);
     const [cookies] = useCookies(['accessToken']);
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
    <div>
       {carDetails.make}
    </div>
  )
}

export default CarDetails