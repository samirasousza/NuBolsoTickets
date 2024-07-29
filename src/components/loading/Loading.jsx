import React from 'react'
import Logo from '../../assets/NBL.png'
import './Loading.css'

const Loading = () => {
  return (
    <div className='loading-container'>
      <img src={Logo} className='loading-logo' />
    </div>
  )
}

export default Loading
