import React, { useEffect, useState } from 'react'
import axios  from 'axios';
import './EventCard.css';
import Loading from '../loading/Loading';

const EventCard = () => {
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events', {
              params: {
                apikey: 'FcsA4CaN4M6CyCHDrAw6wnhsXLTfGetf', // Substitua pela sua chave da API
                countryCode: 'US', // Filtrando por país, pode ajustar conforme necessário
                //classificationName: 'music', // Exemplo de filtro por categoria de música
                size: 3 // Número de eventos a serem retornados
              }
            });
            setEvents(response.data._embedded.events);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
          }
        };
    
        fetchEvents();
      }, []);

      if (loading) {
        return <div><Loading /></div>;
      }

  return (
    <div className="EventCardContainer">
      {events.map(event => (
        <div key={event.id} className=" EventCard">
          <h2>{event.name}</h2>
          <p>Data: {new Date(event.dates.start.dateTime).toLocaleString()}</p>
          <p>Local: {event._embedded.venues[0].name}</p>
          <p>Endereço: {event._embedded.venues[0].address.line1}</p>
          <p>Preço: {event.priceRanges ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}` : 'Preço não disponível'}</p>
          <p>Descrição: {event.info ? event.info : 'Descrição não disponível'}</p>
        </div>
      ))}
    </div>
  );
}

export default EventCard;
