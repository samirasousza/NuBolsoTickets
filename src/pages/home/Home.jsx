import React from 'react';
import './Home.css';
import EventCard from '../../components/eventCard/EventCard';
import Navbar from '../../components/navbar/Navbar';

const Home = () => {
  return (
    <div className="HomeContainer">
      <h1 className="HomeTittle">Eventos</h1>
      <Navbar />
      <EventCard />

      <div className="HomeEventsContainer">
      </div>
    </div>
  );
}

export default Home;