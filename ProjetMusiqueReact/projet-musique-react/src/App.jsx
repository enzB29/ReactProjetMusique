
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
      <button onClick={()=>setnavigation(<Events />)} style={buttonStyle}>Events</button>
      <button onClick={()=>setnavigation(<Artists />)} style={buttonStyle}>Artists</button>
      <button onClick={()=>setnavigation(<InputsEvent />)} style={buttonStyle}>Rechercher un event</button>
      <button onClick={()=>setnavigation(<InputsArtist />)} style={buttonStyle}>Rechercher un artiste</button>
    </ul>
    {navigation}
    
  </div>
}





function Artists() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortedArtists, setSortedArtists] = useState([]);
  const [isSorted, setIsSorted] = useState(false); // Ajout d'un état pour savoir si les artistes sont triés

  useEffect(() => {
    console.log('Fetching artists...');
    fetch('http://127.0.0.1:8000/api/artists')
      .then((res) => res.json())
      .then((jsondata) => {
        console.log('API Response:', jsondata);
        if (Array.isArray(jsondata)) {
          setArtists(jsondata);
          setSortedArtists(jsondata); // Par défaut, afficher les artistes non triés
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

  // Fonction pour trier les artistes par nom
  const sortArtistsAlphabetically = () => {
    if (!isSorted) {
      // Si les artistes ne sont pas encore triés, on les trie par ordre alphabétique
      const sorted = [...artists].sort((a, b) => a.name.localeCompare(b.name));
      setSortedArtists(sorted);
      setIsSorted(true); // Mettre à jour l'état pour indiquer que la liste est triée
    } else {
      // Si les artistes sont déjà triés, on les remet dans l'ordre original
      setSortedArtists(artists);
      setIsSorted(false); // Réinitialiser l'état pour indiquer qu'ils ne sont plus triés
    }
  };

  return (
    <div>
      <h2>Artists</h2>
      <button onClick={sortArtistsAlphabetically}>
        {isSorted ? "Afficher les artistes non triés" : "Trier par ordre alphabétique"} 
        {/* change le texte si les artits sont trié ou non */}
      </button>
      <ul>
        {(isSorted ? sortedArtists : artists).length > 0 ? (
          (isSorted ? sortedArtists : artists).map((artist) => (
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








function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [sortedEvents, setSortedEvents] = useState([]);
  const [isSorted, setIsSorted] = useState(false); // Pour savoir si trié alphabétiquement
  const [isDateSorted, setIsDateSorted] = useState(false); // Pour savoir si trié par date

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/events')
      .then((res) => res.json())
      .then((jsondata) => {
        console.log('API Response:', jsondata);
        if (Array.isArray(jsondata)) {
          setEvents(jsondata);
          setSortedEvents(jsondata); // Par défaut, afficher les événements non triés
        } else {
          console.error('Unexpected API response format:', jsondata);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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

  // Fonction pour trier par ordre alphabétique
  const sortEventAlphabetically = () => {
    if (!isSorted) {
      const sorted = [...events].sort((a, b) => a.name.localeCompare(b.name));
      setSortedEvents(sorted);
      setIsSorted(true);
    } else {
      setSortedEvents(events);
      setIsSorted(false);
    }
  };

  // Fonction pour trier les événements par date
  const sortEventsByDate = () => {
    if (!isDateSorted) {
      // Trier par date croissante (on suppose que la date est une chaîne ISO, par exemple "2025-03-27")
      const sortedByDate = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
      setSortedEvents(sortedByDate);
      setIsDateSorted(true);
    } else {
      // Trier par date décroissante
      const sortedByDateDesc = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
      setSortedEvents(sortedByDateDesc);
      setIsDateSorted(false);
    }
  };

  return (
    <div>
      <h2>Events</h2>

      {/* Boutons de tri */}
      <button onClick={sortEventAlphabetically}>
        {isSorted ? "Afficher les Events non triés" : "Trier par ordre alphabétique"}
      </button>
      <button onClick={sortEventsByDate}>
        {isDateSorted ? "Trier par date décroissante" : "Trier par date croissante"}
      </button>

      <ul>
        {(isSorted || isDateSorted ? sortedEvents : events).length > 0 ? (
          (isSorted || isDateSorted ? sortedEvents : events).map((event) => (
            <li key={event.id}>
              <h3>Nom de l'event : {event.name}</h3>
              <p>Date de l'event : {event.date}</p>
              <p>Nom de l'artiste phare : {event.artist.name}</p>
              <p>Créateur de l'event : {event.creator.email}</p>
              <button onClick={() => fetchEvent(event.id)}>Voir event</button>
            </li>
          ))
        ) : (
          <li>No events found.</li>
        )}
      </ul>

      {/* Affichage des détails de l'événement sélectionné */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {selectedEvent && (
        <div>
          <h3>{selectedEvent.name}</h3>
          <ul>
            <li>ID: {selectedEvent.id}</li>
            <li>Date: {selectedEvent.date}</li>
            <li>Creator: {selectedEvent.creator}</li>
            <li>Artist name: {selectedEvent.artist}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '12px 20px',        // Plus de padding pour une meilleure taille de bouton
  backgroundColor: '#2c3e50',   // Couleur de fond du bouton
  color: 'white',               // Couleur du texte
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
  width: '100%',                // Faire les boutons occuper toute la largeur du conteneur
};


export default App
