import React from 'react'
import Logo from '../../assets/NuBolsoLogo.png'
import './Loading.css'

const Loading = () => {
  return (
    <div className='loafing-container'>
      <img src={Logo} className='loading-logo' />
    </div>
  )
}

export default Loading
