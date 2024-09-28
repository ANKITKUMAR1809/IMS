import React, { useState } from 'react'
import './css/Home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate= useNavigate();
  return (
    <>
      <section className='home width'>
        <div className='container'>
          <div className='main-box'>
            <div onClick={() => navigate('/login')} className='btn'>Login</div>
            <div onClick={() => navigate('/register')} className='btn'>Register</div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Home