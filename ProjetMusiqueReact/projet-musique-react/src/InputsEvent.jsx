import { useState, useEffect } from "react";

export default function InputsEvent() {
    // États pour les différents éléments de l'interface
    const [text, setText] = useState(""); // Recherche par ID d'événement
    const [filter, setFilter] = useState(""); // Filtrage par nom d'événement
    const [events, setEvents] = useState([]); // Liste des événements récupérés
    const [eventId, setEventId] = useState(null); // Détails d'un événement spécifique
    const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur si l'événement est introuvable
    const [users, setUsers] = useState([]); // Liste des utilisateurs inscrits à l'événement
    const [artistDetails, setArtistDetails] = useState(null); // Détails de l'artiste

    // Récupération de tous les événements au chargement du composant
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/events")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(error => console.error("Erreur lors de la récupération des événements :", error));
    }, []);

    // Fonction pour récupérer un événement spécifique par ID
    const fetchEvent = () => {
        fetch(`http://127.0.0.1:8000/api/events/${text}`)
            .then(res => {
                if (!res.ok) throw new Error(`Erreur ${res.status}: Événement non trouvé`);
                return res.json();
            })
            .then(jsondata => {
                setEventId(jsondata);
                setErrorMessage("");
                setUsers(jsondata.users); // Assurer que les utilisateurs sont inclus dans la réponse
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de l'événement :", error);
                setEventId(null);
                setErrorMessage("Aucun événement trouvé avec cet ID.");
            });
        setText(""); // Réinitialiser le champ de recherche
    };

    // Fonction pour récupérer les détails de l'artiste
    const fetchArtistDetails = (artistId) => {
        fetch(`http://127.0.0.1:8000/api/artists/${artistId}`)
            .then(res => res.json())
            .then(data => setArtistDetails(data))
            .catch(error => console.error("Erreur lors de la récupération des détails de l'artiste :", error));
    };

    // Filtrage dynamique des événements par nom
    const filterEvents = () => {
        return events.filter(event =>
            event.name.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <div>
            {/* Message d'erreur si l'événement n'est pas trouvé */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {/* Détails de l'événement spécifique */}
            {eventId && (
                <div className="event-detail">
                    <h3>{eventId.name}</h3>
                    <ul>
                        <li><strong>ID:</strong> {eventId.id}</li>
                        <li><strong>Date:</strong> {new Date(eventId.date).toLocaleString()}</li>
                        <li><strong>Créateur:</strong> {eventId.creator.email}</li>
                    </ul>

                    {/* Liste des utilisateurs inscrits */}
                    <h4>Utilisateurs inscrits :</h4>
                    <ul>
                        {users.length > 0 ? (
                            users.map(user => (
                                <li key={user.id}>
                                    <strong>{user.name}</strong> - {user.email}
                                </li>
                            ))
                        ) : (
                            <p>Aucun utilisateur inscrit pour cet événement.</p>
                        )}
                    </ul>
                </div>
            )}

            {/* Section de filtrage des événements */}
            <div className="filter-section">
                <h2>Filtrer les événements par nom</h2>
                <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)} // Met à jour l'état du filtre
                />
            </div>

            {/* Liste des événements filtrés */}
            <div className="events-list">
                {filterEvents().length > 0 ? (
                    <ul>
                        {filterEvents().map(event => (
                            <li key={event.id} className="event-item">
                                <div className="event-info">
                                    <strong>{event.name}</strong> - {new Date(event.date).toLocaleString()} - {event.artist.name}

                                    {/* Bouton pour afficher les détails de l'artiste */}
                                    <div className="artist-info">
                                        <button onClick={() => fetchArtistDetails(event.artist.id)}>
                                            Voir les détails de l'artiste
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun événement correspondant.</p>
                )}
            </div>

            {/* Détails de l'artiste */}
            {artistDetails && (
                <div className="artist-detail">
                    <h4>Détails de l'artiste : {artistDetails.name}</h4>
                    {artistDetails.image ? (
                        <img src={artistDetails.image} alt={artistDetails.name} style={{ width: "150px", height: "150px" }} />
                    ) : (
                        <p>Pas d'image disponible pour cet artiste.</p>
                    )}
                    <p><strong>Description:</strong> {artistDetails.description}</p>
                </div>
            )}
        </div>
    );
}
