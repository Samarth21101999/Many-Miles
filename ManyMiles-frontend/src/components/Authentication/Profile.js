import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
    const navigate=useNavigate();

    const [cookies] = useCookies(['accessToken']);
    const [profileData, setProfileData] = useState(null);
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          if (!cookies.accessToken) {
            navigate("/login");
            return;
          }
          const res = await axios.get('http://localhost:5000/user/profile',{
            headers: {
              'Authorization': `Bearer ${cookies.accessToken}`,
            },
            withCredentials: true
          });
          
          setProfileData(res.data.user); // Adjust based on your API response
        } catch (err) {
          console.error('Error fetching profile:', err);
          toast.error('Failed to fetch profile. Please try again.');
          navigate('/login');
        }
      };
    
      if (cookies.accessToken) {
        fetchProfile();
      } else {
        navigate('/login');
      }
    }, [cookies, navigate]);
  
    if (!profileData) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p>Loading profile...</p>
        </div>
      );
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
      };
    
      const handleUpdate = async() => {
        try{
         const res=await axios.patch(`http://localhost:5000/user/update`, {...profileData}, 
          {
            headers: {
              'Authorization': `Bearer ${cookies.accessToken}`,
            },
            withCredentials: true
          }
         )
         toast.success('Profile updated successfully!');
         setProfileData(res.data.user);
         navigate('/');
        }catch(error){
          console.log(error);
          toast.error('Failed to update profile. Please try again.');
        }
        // Here you would typically send the updated profile data to your backend
        // dispatch(updateProfile(profileData));
        
      };
    
      const handleCancel = () => {
        navigate('/');
      };
    

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-semibold mb-4">Profile</h1>
    <ToastContainer/>
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-4">
        <strong className="block mb-2">Name:</strong>
        <input
          type="text"
          name="name"
          value={profileData.name || ''}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <strong className="block mb-2">Email:</strong>
        <input
          type="email"
          name="email"
          value={profileData.email || ''}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <strong className="block mb-2">Contact Number:</strong>
        <input
          type="text"
          name="contactNo"
          value={profileData.contactNo || ''}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      {profileData.driverLicense && (
        <div className="mb-4">
          <strong className="block mb-2">Driver's License:</strong>
          <p>Number:</p>
          <input
            type="text"
            name="driverLicense.number"
            value={profileData.driverLicense.number || ''}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <p>Expiry Date:</p>
          <input
            type="date"
            name="driverLicense.expiryDate"
            value={profileData.driverLicense.expiryDate ? new Date(profileData.driverLicense.expiryDate).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <p>Verified: {profileData.driverLicense.verified ? 'Yes' : 'No'}</p>
        </div>
      )}

      <div className="mb-4">
        <strong className="block mb-2">Car Owner:</strong>
        <select
          name="isCarOwner"
          value={profileData.isCarOwner}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Update
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default Profile