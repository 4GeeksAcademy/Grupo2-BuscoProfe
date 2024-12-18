import React, { useState } from 'react';
import "../../styles/classDetails.css";
import { TeacherProfiles} from "./selectclass" 

function Classdetailsteacher() {
    // Estado para almacenar la imagen del perfil
    const [profileImage, setProfileImage] = useState("https://xsgames.co/randomusers/avatar.php?g=female");

    // Función para cambiar la imagen aleatoriamente entre géneros
    // const changeProfileImage = () => {
    //     const randomGender = Math.random() > 0.5 ? 'male' : 'female';
    //     setProfileImage(`https://xsgames.co/randomusers/avatar.php?g=${randomGender}`);
    // };

    return (
        <div className="class-container">

            <div className="pic-usuario">
                <img
                    src={profileImage}
                    alt="Profesor"
                    className="profe-image"
                />

                <div className="informacion-usuario">
                    <h2 className="profile-name">Camila Pérez</h2>
                    <h6 className="profesor mb-2 text-body-secondary">Estudiante de Bachillerato</h6>
                    <p className="descripcion">
                       En caso de no poder cumplir con la clase, debes cancelar con anticipación.
                       Al estudiante le llegará una notificación de tu cancelación. 
                    </p>
                </div>
            </div>

            <div className="class-details-body">
                <h5 className="card-title">Detalles de la clase</h5>

                <div className="info-adicional">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Día: 20/12/24</li>
                        <li className="list-group-item">Horario: 14:30 a 15:30 hrs</li>
                        <li className="list-group-item">Modalidad: Online</li>
                        <li className="list-group-item">Precio por hora: $ 300</li>
                        <li className="list-group-item">Idiomas: Español</li>
                    </ul>
                </div>

                <div className="botones d-grid gap-2 d-md-flex justify-content-md-end">
                    {/* <button className="agendar-boton" type="button">Agendar</button> */}
                    <button className="volver-boton" type="button">
                    <a href="">Ingresar a la clase</a></button>
                    <button className="volver-boton" type="button">
                    <a href="">Cancelar</a></button>
                    <button className="volver-boton" type="button">
                        <a href="./teacherDashboard">Volver</a></button>
                </div>
                
            </div>
        </div>
    );
}
export default Classdetailsteacher;
