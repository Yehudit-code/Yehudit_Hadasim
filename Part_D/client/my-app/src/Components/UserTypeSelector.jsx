import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    if (type === 'owner') navigate('/login/owner');
    if (type === 'supplier') navigate('/login/supplier');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Select User Type</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handleSelect('owner')}
          className="px-6 py-3 bg-gray-100 text-black rounded-md shadow hover:bg-gray-200"
        >
          Owner
        </button>
        <button
          onClick={() => handleSelect('supplier')}
          className="px-6 py-3 bg-gray-100 text-black rounded-md shadow hover:bg-gray-200"
        >
          Supplier
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelector;