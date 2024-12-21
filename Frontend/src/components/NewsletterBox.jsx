import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler=(event)=>{
    event.preventDefault()

  }
  return (
    <div className='text-center'>
    <p className='text-2xl font-medium text-gary-800'>Subscribe now & get 20% off</p>
    <p className=' mt-3 text-gray-600 '>
    Unlock exclusive deals and stay updated with our latest collections. Join our community today!
    </p>
    <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
      <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required />
      <button type='submit' className='bg-black text-white text-xs px-10 py-4'>
        SUBSCRIBE
      </button>
    </form>
    </div>
  )
}

export default NewsletterBox