import { useState } from "react";

export default function InputsEvent() {
    const [text, setText] = useState("");
    const [artistId, setArtistId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher l'erreur

    const fetchArtist = () => {//fetch les évent si l'id est bon et est rensigné dans le champs text
        fetch(`http://127.0.0.1:8000/api/artists/${text}`)
            .then(res => {
                if (!res.ok) { //si il y a une erreur 404 on donne une nouvelle error a la console
                throw new Error(`Erreur ${res.status}: Artiste non trouvé`);
                }
                return res.json();//return le json
            })
            .then(jsondata => {
                if (jsondata) {
                    setArtistId(jsondata); // Stocke les données de l'événement
                    setErrorMessage(""); // Efface tout message d'erreur précédent
                } else {
                    setArtistId(null);
                    setErrorMessage("Aucun artiste trouvé avec cet ID."); //si il n'y a pas de data alors l'event avec cet id
                                                                            //n'existe pas donc message d'error qui sera affiché
                                                                            //plus tard
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération :", error);
                setArtistId(null);
                setErrorMessage("Aucun artiste trouvé avec cet ID."); // Affiche le message d'erreur
            });
            setText("");
    };

    return (
        <div>
            <h2>Recherche d'Artistes</h2>
            <input
                type="text"
                placeholder="Entrez un ID"
                value={text}
                onChange={(e) => setText(e.target.value)}//change la valeur du text selon ce que l'utilisateur renseigne 
            />
            <button onClick={fetchArtist}>Rechercher</button>

            {/* Affichage du message d'erreur si l'ID n'existe pas */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
            {/* il s'affiche a chaque fois, s'il est vide il sera quand même affiché mais on ne le verra pas */}

            {/* Affichage de l'événement s'il existe */}
            {artistId && ( //affiche tout les infos sur l'event avec l'id renseigné
                <div>
                    <h3>{artistId.name}</h3>
                    <ul>
                        <li>ID: {artistId.id}</li>
                        <li>Description: {artistId.description}</li>
                        <li>Image: {artistId.image}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
