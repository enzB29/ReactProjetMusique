
import { useEffect, useState } from 'react';
import './App.css'
import InputsEvent from './InputsEvent';
import InputsArtist from './InputsArtist';
// import TodoList from './TodoList';

function App() {

  const [navigation, setnavigation] = useState(<Artists />)
  

  //dogapi
   
  
  return <div className='container' style={{  }}>
    <ul>
    <li onClick={()=>setnavigation(<Events />)}>Events</li>
    <li onClick={()=>setnavigation(<Artists />)}>Artists</li>
    <li onClick={()=>setnavigation(<InputsEvent />)}>Rechercher un event</li>
    <li onClick={()=>setnavigation(<InputsArtist />)}>Rechercher un artiste</li>
    </ul>
    {navigation}
    {/* <Artists /><br />
    <Events /><br />
    <InputsEvent /><br />
    <InputsArtist /> */}
    
  </div>
}





function Artists() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log('Fetching artists...');
    fetch('http://127.0.0.1:8000/api/artists')
      .then((res) => res.json())
      .then((jsondata) => {
        console.log('API Response:', jsondata);
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

  function fetchArtist(artistID) {
    fetch(`http://127.0.0.1:8000/api/artists/${artistID}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: Artiste non trouvé`);
        }
        return res.json();
      })
      .then(jsondata => {
        if (jsondata) {
          setSelectedArtist(jsondata);
          setErrorMessage("");
        } else {
          setSelectedArtist(null);
          setErrorMessage("Aucun artiste trouvé avec cet ID.");
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération :", error);
        setSelectedArtist(null);
        setErrorMessage("Aucun artiste trouvé avec cet ID.");
      });
  }

  return (
    <div>
      <h2>Artists</h2>
      <ul>
        {artists.length > 0 ? (
          artists.map((artist) => (
            <li key={artist.id}>
              <h3>{artist.name}</h3>
              <p>{artist.description}</p>
              <img src={artist.image} style={{ width: '100px' }} /><br />
              <button onClick={() => fetchArtist(artist.id)}>Voir détails</button>
            </li>
          ))
        ) : (
          <li>No artists found.</li>
        )}
      </ul>

      {/* Affichage des détails de l'artiste sélectionné */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {selectedArtist && (
        <div>
          <h3>{selectedArtist.name}</h3>
          <ul>
            <li>ID: {selectedArtist.id}</li>
            <li>Description: {selectedArtist.description}</li>
            <li><img src={selectedArtist.image} style={{ width: '150px' }} /></li>
          </ul>
        </div>
      )}
    </div>
  );
}






function Events(){
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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

  function fetchEvent(EventID) {
    fetch(`http://127.0.0.1:8000/api/events/${EventID}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: Event non trouvé`);
        }
        return res.json();
      })
      .then(jsondata => {
        if (jsondata) {
          setSelectedEvent(jsondata);
          setErrorMessage("");
        } else {
          setSelectedEvent(null);
          setErrorMessage("Aucun event trouvé avec cet ID.");
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération :", error);
        setSelectedEvent(null);
        setErrorMessage("Aucun event trouvé avec cet ID.");
      });
  }

  return <div>
    <h2>Events</h2>
    <ul>
      {events.map((event)=> ( 
        <li key={event.id}>
          <h3>Nom de l'event : {event.name}</h3>
          <p>Date de l'event : {event.date}</p>
          <p>Nom de l'artist phare : {event.artist.name}</p> 
          {/* Essayer de faire le onClique qui montrera les infos de l'artiste */}
          <p>Createur de l'event : {event.creator.email} </p>
          <button onClick={()=>fetchEvent(event.id)}>Voir event</button>
        </li>
      )
      )}
    </ul>

    {/* Affichage des détails de l'artiste sélectionné */}
    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {selectedEvent && (
        <div>
          <h3>{selectedEvent.name}</h3>
          <ul>
            <li>ID: {selectedEvent.id}</li>
            <li>Date: {selectedEvent.date}</li>
            <li>Creator: {selectedEvent.creator}</li>
            <li>Artist name: {selectedEvent.artist}</li>
            {/* {console.log(selectedEvent.creator.email)} */}
          </ul>
        </div>
      )}
  </div>
}

export default App
