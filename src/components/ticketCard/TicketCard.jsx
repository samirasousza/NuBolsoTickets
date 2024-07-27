import React, { useEffect, useState } from 'react'
import Loading from '../loading/Loading';
import axios from 'axios';
import { PiPrinterFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import CreatePDF from '../createPDF/CreatePDF';
import './TicketCard.css'
import { IoTime } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';

const TicketCard = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
        <div className="eventcard-container">
        {events.map(event => (
            <div key={event.id} className="eventcard-box">
              
              <img src={event.images[0].url} alt={event.name} />
              
              <div className='eventcard-infos'>
              
                <h2>{event.name}</h2>

                <div className='eventcard-itens'>
                  <div className='eventcard-item'>
                    <IoTime className='eventcard-item-icon'/>
                    <p>Data: {new Date(event.dates.start.dateTime).toLocaleString()}</p>
                  </div>

                  <div className='eventcard-item'>
                    <FaLocationDot className='eventcard-item-icon' />
                    <div className='eventcard-item-location'>
                      <p>Local: {event._embedded.venues[0].name}</p>
                      <p>Endereço: {event._embedded.venues[0].address.line1}</p>
                    </div>
                  </div>
                </div>
              
              </div>

                <div className='ticket-options'>
                    <button className='ticket-print'onClick={() => CreatePDF(event)}>
                        <PiPrinterFill />
                        <span>Imprimir Ingresso</span>
                    </button>
                </div>

            </div>
        ))}
        </div>
    )
}

export default TicketCard