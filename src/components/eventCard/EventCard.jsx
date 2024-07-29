import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventCard.css';
import Loading from '../loading/Loading';

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classifications, setClassifications] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events', {
          params: {
            apikey: 'FcsA4CaN4M6CyCHDrAw6wnhsXLTfGetf', // Substitua pela sua chave da API
            countryCode: 'US', // Filtrando por país, pode ajustar conforme necessário
            size: 18 // Número de eventos a serem retornados
          }
        });

        const events = response.data._embedded.events;
        const classificationNames = new Set();

        events.forEach(event => {
          event.classifications?.forEach(classification => {
            classificationNames.add(classification.segment.name);
          });
        });

        const classificationArray = Array.from(classificationNames);
        const randomClassifications = getRandomClassifications(classificationArray, 15);
        setClassifications(randomClassifications);

        setEvents(events);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getRandomClassifications = (names, count) => {
    const shuffled = names.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day}`;
  };

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEC"];
    return months[date.getMonth()];
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (!events.length) {
    return <div><p>No events found.</p></div>;
  }

  return (
    <div className="eventcard-container">
      <div className='eventcard-boxes'>
        {events.map(event => (
          <div key={event.id} className="eventcard-box">
            <img src={event.images[0]?.url} alt={event.name} />
            
            <div className='eventcard-infos'>
              <div className='eventcard-itens'>
                <div className='eventcard-data'>
                  <p>{formatDate(event.dates.start.dateTime)}</p>
                  <p>{formatMonth(event.dates.start.dateTime)}</p>
                </div>

                <div className='eventcard-text'>
                  <div className='eventcard-item'>
                    <h2>{event.name}</h2>
                  </div>

                  <div className='eventcard-item'>
                    <div className='eventcard-item-location'>
                      <p>Local: {event._embedded.venues[0]?.name}</p>
                      <p>Endereço: {event._embedded.venues[0]?.address.line1}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
