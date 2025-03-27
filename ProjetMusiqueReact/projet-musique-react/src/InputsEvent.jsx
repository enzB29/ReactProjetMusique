import { useState, useEffect } from "react";

export default function InputsEvent() {
    const [text, setText] = useState("");
    const [filter, setFilter] = useState(""); // État pour le filtre par nom
    const [events, setEvents] = useState([]); // Liste complète des événements
    const [eventid, setEventId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Récupère tous les événements une seule fois au chargement du composant
        fetch(`http://127.0.0.1:8000/api/events`)
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(error => console.error("Erreur lors de la récupération des événements :", error));
    }, []);

    const fetchEvent = () => {
        fetch(`http://127.0.0.1:8000/api/events/${text}`)
            .then(res => {
                if (!res.ok) throw new Error(`Erreur ${res.status}: Événement non trouvé`);
                return res.json();
            })
            .then(jsondata => {
                setEventId(jsondata);
                setErrorMessage("");
            })
            .catch(error => {
                console.error("Erreur lors de la récupération :", error);
                setEventId(null);
                setErrorMessage("Aucun événement trouvé avec cet ID.");
            });
        setText("");
    };

    const filterEvents = () => {
        // Filtrer les événements en fonction du champ de recherche
        return events.filter(event =>
            event.name.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <div>
            <h2>Recherche d'Événement</h2>

            {/* Champ de recherche par ID */}
            <input
                type="text"
                placeholder="Entrez un ID"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={fetchEvent}>Rechercher par ID</button>

            {/* Affichage du message d'erreur si l'ID n'existe pas */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {/* Affichage de l'événement spécifique trouvé */}
            {eventid && (
                <div>
                    <h3>{eventid.name}</h3>
                    <ul>
                        <li>ID: {eventid.id}</li>
                        <li>Date: {eventid.date}</li>
                        <li>Artiste: {eventid.artist}</li>
                    </ul>
                </div>
            )}

            {/* Champ de filtre par nom */}
            <h2>Filtrer les Événements par Nom</h2>
            <input
                type="text"
                placeholder="Rechercher par nom..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <button onClick={filterEvents}>Filtrer</button>

            {/* Liste des événements filtrés */}
            {filterEvents().length > 0 ? (
                <ul>
                    {filterEvents().map(event => (
                        <li key={event.id}>
                            <strong>{event.name}</strong> - {event.date} - {event.artist}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun événement correspondant.</p>
            )}
        </div>
    );
}
