import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterForm = ({userType}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${userType} Registration`, formData); 
    // קריאה ל-API כאן
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <button
        onClick={() => navigate(`/login/${userType}`)}
        className="mb-4 px-4 py-2 bg-gray-100 rounded-md shadow hover:bg-gray-200"
      >
        Back to login
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800 capitalize">
        {userType} Registration
      </h1>

      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md shadow"
          onChange={handleChange}
          value={formData.fullName}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md shadow"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md shadow"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button
          type="submit"
          className="w-full bg-gray-100 text-black py-2 rounded-md shadow hover:bg-gray-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};


export default RegisterForm;
