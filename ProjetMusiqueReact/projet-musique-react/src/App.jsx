
import { useEffect, useState } from 'react';
import './App.css'
// import Inputs from './Inputs';
// import TodoList from './TodoList';

function App() {
  

  //dogapi
   
  
  return <div className='container' style={{  }}>
    {/* <Inputs /> */}
    <Artists /><br />
    <Events />
    
  </div>
}





function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    console.log('Fetching artists...');

    fetch('http://127.0.0.1:8000/api/artists')
      .then((res) => res.json())
      .then((jsondata) => {
        console.log('API Response:', jsondata); // donne dans la console les élément de la data

        // If jsondata is an array (i.e., multiple artists)
        if (Array.isArray(jsondata)) {
          setArtists(jsondata);
        } else {
          console.error('Unexpected API response format:', jsondata);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Artists</h2>
      <ul>
        {artists.length > 0 ? (
          artists.map((artist) => (
            <li key={artist.id}>
              <h3>{artist.name}</h3>
              <p>{artist.description}</p>
              {/* <p>{artist.image}</p> */}
              
              <img src={artist.image} style={{ width: '100px' }} /><br />
            </li>
          ))
        ) : (
          <li>No artists found.</li>
        )}
      </ul>
    </div>
  );
}



function Events(){
  const [events, setEvents] = useState([])

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/events')
      .then((res) => res.json())
      .then((jsondata) => {
        console.log('API Response:', jsondata); // donne dans la console les élément de la data

        // If jsondata is an array (i.e., multiple artists)
        if (Array.isArray(jsondata)) {
          setEvents(jsondata);
        } else {
          console.error('Unexpected API response format:', jsondata);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  },[])

  return <div>
    <h2>Events</h2>
    <ul>
      {events.map((event)=> ( 
        <li key={event.id}>
          <h3>Nom de l'event : {event.name}</h3>
          <p>Date de l'event : {event.date}</p>
          <p>Nom de l'artist phare : {event.artist.name}</p>
        </li>
      )
      )}
    </ul>
  </div>
}

export default App
