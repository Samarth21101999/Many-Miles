import React from 'react'
import {Link} from 'react-router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router'
const AddCar = () => {
    const [cookies] = useCookies(['accessToken']);
    const [error, setError] = useState('');
    const [files,setFiles]=useState([]);
  const navigate=useNavigate();
    

    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        licensePlate: '',
        description: '',
        features: '',
        pricePerDay: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        policyNumber: '',
        provider: '',
        coverageType: '',
        expiryDate: '',

      });
    
      const [loading, setLoading] = useState(false);
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      
    const handleSubmit = async (e) => {


        console.log(cookies.accessToken)
        e.preventDefault();
        setLoading(true);
        
        try {

            const data=new FormData();
            console.log(data)

            const location = {
              type: 'Point',
              coordinates: [0, 0], // You can update this with real coordinates if needed
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode
            };
            const availability = {
              startDate: formData.startDate,
              endDate: formData.endDate
            }

            const insurance={
              policyNumber: formData.policyNumber,
              provider: formData.provider,
              coverageType: formData.coverageType,
              expiryDate: formData.expiryDate,
              verified: false,
            }

            const fieldsToSend = {
              ...formData,
              features: formData.features.split(',').map(f => f.trim()), // convert to array
              location,
              availability,
              insurance,
            };

            data.append('make', formData.make);
            data.append('model', formData.model);
            data.append('year', formData.year);
            data.append('licensePlate', formData.licensePlate);
            data.append('description', formData.description);
            data.append('pricePerDay', formData.pricePerDay);

            // Features as array
            data.append('features', JSON.stringify(formData.features.split(',').map(f => f.trim())));

            // Append nested objects as JSON strings
            data.append('location', JSON.stringify({
              type: 'Point',
              coordinates: [0, 0],
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode
            }));

            data.append('availability', JSON.stringify([{
              startDate: formData.startDate,
              startTime: formData.startTime,
              endDate: formData.endDate,
              endTime: formData.endTime
            }]));

            data.append('insurance', JSON.stringify({
              policyNumber: formData.policyNumber,
              provider: formData.provider,
              coverageType: formData.coverageType,
              expiryDate: formData.expiryDate,
              verified: false
            }));

            // Owner ID
            const userId = JSON.parse(localStorage.getItem('user'));
            data.append('owner', userId._id);

            // Files
            files.forEach(file => {
              data.append('images', file);
            });

            const response = await axios.post('http://localhost:5000/car/addCar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${cookies.accessToken}`,
                   
                },
                withCredentials: true
            });
            if (response.status === 200) {
                toast.success('Car added successfully!');
                setFormData({
                    make: '',
                    model: '',
                    year: '',
                    licensePlate: '',
                    description: '',
                    features: '',
                    pricePerDay: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    startDate: '',
                    startTime: '',
                    endDate: '',
                    endTime: '',
                    policyNumber: '',
                    provider: '',
                    coverageType: '',
                    expiryDate: '',
                });
                navigate('/');
            } else {
                setError('Failed to add car. Please try again.');
                toast.error('Failed to add car. Please try again.');
            }

            console.log(response.data);
        } catch (error) {
            setError(JSON.stringify(error.response.data));
            console.log(error.response.data);
            toast.error('Failed to add car. Please try again.');
        } finally {
            setLoading(false);
        }
       
    }
  return (
    <div>
   
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-4 border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center">Add New Car</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}  className="space-y-6" encType="multipart/form-data">
        {/* Group 1: Make, Model, Year */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Make</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Group 2: License Plate, Price, Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price Per Day ($)</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Features (comma separated)</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        {/* Group 3: Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
        {/* Availability Period */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Available From</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
          <div>
            <label className="block mb-1 font-medium">Available Until</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

      {/* Insurance Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-1 font-medium">Insurance Policy Number</label>
          <input
            type="text"
            name="policyNumber"
            value={formData.policyNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Insurance Provider</label>
          <input
            type="text"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Coverage Type</label>
          <input
            type="text"
            name="coverageType"
            value={formData.coverageType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

        {/* Photo Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Photos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e)=>setFiles(Array.from(e.target.files))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {loading ? 'Adding...' : 'Add Car'}
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default AddCar