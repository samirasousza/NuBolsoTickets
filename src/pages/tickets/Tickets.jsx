import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import EventCard from '../../components/eventCard/EventCard'
import { Footer } from 'antd/es/layout/layout'
import TicketCard from '../../components/ticketCard/TicketCard'
import './Tickets.css'

const Tickets = () => {
  return (
    <div className="tickets-container">
      <Navbar />
      <h1 className="tickets">Ingressos</h1>
      <div className="tickets">
        <TicketCard />
      </div>
      <Footer />
    </div>
  )
}

export default Tickets