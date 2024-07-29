import React from 'react';
import './Home.css';
import EventCard from '../../components/eventCard/EventCard';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className='tickets-tittle' >
        <h1>Eventos</h1>
      </div>
      <div className="home-cards">
        <EventCard />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
