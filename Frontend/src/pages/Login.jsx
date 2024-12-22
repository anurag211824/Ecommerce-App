import React, { useState } from 'react';

const Login = () => {
  const [currentSate, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentSate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {/* Name input only visible on Sign Up */}
      {currentSate === 'Login' ? '' : <input className='w-full px-3 py-2 border border-gray-800' placeholder='Name' type="text" required />}
      <input className='w-full px-3 py-2 border border-gray-800' placeholder='Email' type="email" required />
      <input className='w-full px-3 py-2 border border-gray-800' placeholder='Password' type="password" required />
      
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your password ?</p>
        {/* Toggle between Login and Sign Up */}
        {
          currentSate === 'Login' ? 
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p> :
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
            Login here
          </p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentSate === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  );
}

export default Login;
