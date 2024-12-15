import React, { useState } from 'react';
import "../../styles/classDetails.css";

function ClassDetails() {
    // Estado para almacenar la imagen del perfil
    const [profileImage, setProfileImage] = useState("https://xsgames.co/randomusers/avatar.php?g=male");

    // Función para cambiar la imagen aleatoriamente entre géneros
    const changeProfileImage = () => {
        const randomGender = Math.random() > 0.5 ? 'male' : 'female';
        setProfileImage(`https://xsgames.co/randomusers/avatar.php?g=${randomGender}`);
    };

    return (
        <div className="class-container">

            <div className="pic-usuario">
                <img
                    src={profileImage}
                    alt="Profesor"
                    className="profe-image"
                />

                <div className="informacion-usuario">
                    <h2 className="profile-name">Samuel</h2>
                    <h6 className="profesor mb-2 text-body-secondary">Profesor particular de matemática y física</h6>
                    <p className="descripcion">
                        Si buscas aprobar matemática o física, te enseñaré lo necesario para lograrlo. Si no te gustan los números,
                        te compartiré trucos para que pases la materia;
                        y si planeas una carrera afín, te ayudaré a fortalecer tus conocimientos para el futuro.
                    </p>
                </div>
            </div>

            <div className="class-details-body">
                <h5 className="card-title">Detalles de la clase</h5>

                <div className="info-adicional">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Modalidad: Online</li>
                        <li className="list-group-item">Nivel académico: Todos los niveles</li>
                        <li className="list-group-item">Precio por hora: $400</li>
                        <li className="list-group-item">Idiomas: Español</li>
                    </ul>
                </div>

                <div className="botones d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="agendar-boton" type="button">Agendar</button>
                    <button className="volver-boton" type="button">Volver</button>
                </div>
            </div>
        </div>
    );
}

export default ClassDetails;
