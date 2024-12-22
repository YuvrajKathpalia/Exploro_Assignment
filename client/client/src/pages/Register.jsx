import React from 'react';
import RegisterForm from '../components/auth/RegisterForm'; 

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
    
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
