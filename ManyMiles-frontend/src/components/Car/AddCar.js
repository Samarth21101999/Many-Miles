import React from 'react'
import {Link} from 'react-router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const AddCar = () => {
    const [cookies] = useCookies(['accessToken']);
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
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });
            const userId = JSON.parse(localStorage.getItem('user'));
            data.append('owner', userId._id);
            const response = await axios.post('http://localhost:5000/car/addCar', data, {
                headers: {
                    'Content-Type': 'application/json',
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
                    zipCode: ''
                });
            } else {
                toast.error('Failed to add car. Please try again.');
            }

            console.log(response.data);
        } catch (error) {
            console.error('Error adding car:', error);
            toast.error('Failed to add car. Please try again.');
        } finally {
            setLoading(false);
        }
       
    }
  return (
    <div>
   
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-4 border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center">Add New Car</h2>
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

        {/* Photo Upload */}
        {/* <div>
          <label className="block mb-1 font-medium">Upload Photos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            // onChange={handlePhotoUpload}
            className="w-full border px-3 py-2 rounded"
          />
        </div> */}

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