
import React from 'react';
import LoginForm from '../components/auth/LoginForm'; 

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Adventura</h2>
       
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
