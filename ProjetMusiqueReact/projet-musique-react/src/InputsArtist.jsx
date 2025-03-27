import { useState, useEffect } from "react";

export default function InputsEvent() {
    // États pour gérer les données et l'état du composant
    const [filter, setFilter] = useState(""); // Filtre pour les artistes
    const [artists, setArtists] = useState([]); // Liste des artistes
    const [filteredArtists, setFilteredArtists] = useState([]); // Artistes filtrés selon le filtre
    const [events, setEvents] = useState([]); // Liste des événements
    const [selectedArtist, setSelectedArtist] = useState(null); // Artiste sélectionné
    const [artistEvents, setArtistEvents] = useState([]); // Événements associés à l'artiste sélectionné
    const [selectedEvent, setSelectedEvent] = useState(null); // Détails de l'événement sélectionné
    const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur

    // Récupérer tous les artistes
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/artists")
            .then(res => res.json())
            .then(data => {
                setArtists(data);
                setFilteredArtists(data); // Mettre tous les artistes dans la liste filtrée
            })
            .catch(() => setErrorMessage("Impossible de charger les artistes.")); // Gestion de l'erreur
    }, []);

    // Récupérer tous les événements
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/events")
            .then(res => res.json())
            .then(data => setEvents(data)) // Mettre à jour la liste des événements
            .catch(() => setErrorMessage("Impossible de charger les événements.")); // Gestion de l'erreur
    }, []);

    // Filtrage des artistes en fonction du texte de recherche
    useEffect(() => {
        setFilteredArtists(
            artists.filter(artist =>
                artist.name.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [filter, artists]); // Re-filtrer chaque fois que le filtre change

    // Sélectionner un artiste et filtrer ses événements
    const handleArtistSelect = (artist) => {
        setSelectedArtist(artist); // Mettre à jour l'artiste sélectionné
        const relatedEvents = events.filter(event => event.artist?.id === artist.id); // Filtrer les événements associés
        setArtistEvents(relatedEvents);
        setSelectedEvent(null); // Réinitialiser l'événement sélectionné
        
    };

    // Sélectionner un événement et charger ses détails
    const handleEventSelect = (eventId) => {
        fetch(`http://127.0.0.1:8000/api/events/${eventId}`)
            .then(res => res.json())
            .then(data => {
                if (selectedArtist && selectedArtist.id === data.artist.id) {
                    setSelectedEvent(data); // Mettre à jour l'événement sélectionné uniquement si l'artiste correspond
                }
            })
            .catch(() => setErrorMessage("Impossible de charger les détails de l'événement.")); // Gestion de l'erreur
    };

    return (
        <div>
            {/* Section de recherche d'artistes */}
            <h2>Recherche d'Artistes</h2>
            <input
                type="text"
                placeholder="Filtrer par nom"
                value={filter}
                onChange={(e) => setFilter(e.target.value)} // Met à jour le filtre à chaque changement
            />

            {/* Affichage des erreurs */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {/* Liste des artistes filtrés */}
            <ul>
                {filteredArtists.map(artist => (
                    <li key={artist.id}>
                        <h3>{artist.name}</h3>
                        <p>ID: {artist.id}</p>

                        {/* Bouton pour voir les événements associés à l'artiste */}
                        <button onClick={() => handleArtistSelect(artist)}>
                            Voir les événements
                        </button>

                            {/* Affichage des événements de l'artiste sélectionné */}
                            {selectedArtist?.id === artist.id && (
                                <div>
                                    <h4>Événements :</h4>
                                    <ul>
                                        {artistEvents.length > 0 ? (
                                            artistEvents.map(event => (
                                                <li key={event.id}>
                                                    <p><strong>{event.name}</strong></p>
                                                    <p>Date : {new Date(event.date).toLocaleString()}</p>
                                                    {/* Bouton pour afficher les détails d'un événement */}
                                                    <button onClick={() => handleEventSelect(event.id)}>
                                                        Voir les détails
                                                    </button>
                                                </li>
                                            ))
                                        ) : (
                                            <p>Aucun événement trouvé pour cet artiste.</p>
                                        )}
                                    </ul>
                                </div>
                            )}
                    </li>
                ))}
            </ul>

            {/* Détails de l'événement sélectionné */}
            {selectedEvent && (
                <div className="selected-artist-details show">
                    <h3>Détails de l'événement : {selectedEvent.name}</h3>
                    <p><strong>Date :</strong> {selectedEvent.date}</p>
                    <p><strong>Artiste :</strong> {selectedEvent.artist.name}</p>
                    <p><strong>Créateur :</strong> {selectedEvent.creator ? selectedEvent.creator : "Non renseigné"}</p>
                </div>
            )}
        </div>
    );
}
