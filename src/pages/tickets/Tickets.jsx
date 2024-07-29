import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import TicketCard from '../../components/ticketCard/TicketCard'
import Footer from '../../components/footer/Footer';
import './Tickets.css'

const Tickets = () => {
  return (
    <div className="tickets-container">
      <Navbar />
      <div className='tickets-tittle' >
        <h1>Ingressos</h1>
      </div>
      <div className="tickets-cards">
        <TicketCard />
      </div>
      <Footer />
    </div>
  )
}

export default Tickets