import { useState } from "react";

export default function InputsEvent() {
    const [text, setText] = useState("");
    const [eventid, setEventId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher l'erreur

    const fetchEvent = () => {//fetch les évent si l'id est bon et est rensigné dans le champs text
        fetch(`http://127.0.0.1:8000/api/events/${text}`)
            .then(res => {
                if (!res.ok) { //si il y a une erreur 404 on donne une nouvelle error a la console
                    throw new Error(`Erreur ${res.status}: Événement non trouvé`);
                }
                return res.json();//return le json
            })
            .then(jsondata => {
                if (jsondata) {
                    setEventId(jsondata); // Stocke les données de l'événement
                    setErrorMessage(""); // Efface tout message d'erreur précédent
                } else {
                    setEventId(null);
                    setErrorMessage("Aucun événement trouvé avec cet ID."); //si il n'y a pas de data alors l'event avec cet id
                                                                            //n'existe pas donc message d'error qui sera affiché
                                                                            //plus tard
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération :", error);
                setEventId(null);
                setErrorMessage("Aucun événement trouvé avec cet ID."); // Affiche le message d'erreur
            });
            setText("");
    };

    return (
        <div>
            <h2>Recherche d'Événement</h2>
            <input
                type="text"
                placeholder="Entrez un ID"
                value={text}
                onChange={(e) => setText(e.target.value)}//change la valeur du text selon ce que l'utilisateur renseigne 
            />
            <button onClick={fetchEvent}>Rechercher</button>

            {/* Affichage du message d'erreur si l'ID n'existe pas */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
            {/* il s'affiche a chaque fois, s'il est vide il sera quand même affiché mais on ne le verra pas */}

            {/* Affichage de l'événement s'il existe */}
            {eventid && ( //affiche tout les infos sur l'event avec l'id renseigné
                <div>
                    <h3>{eventid.name}</h3>
                    <ul>
                        <li>ID: {eventid.id}</li>
                        <li>Date: {eventid.date}</li>
                        <li>Artiste: {eventid.artist}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
