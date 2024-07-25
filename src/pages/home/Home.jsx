import React from 'react';
import './Home.css';
import EventCard from '../../components/eventCard/EventCard';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div className="HomeContainer">
      <Navbar />
      <h1 className="HomeTittle">Eventos</h1>
      <div className="HomeEventsContainer">
        <EventCard />
      </div>
      <Footer />
    </div>
  );
}

export default Home;