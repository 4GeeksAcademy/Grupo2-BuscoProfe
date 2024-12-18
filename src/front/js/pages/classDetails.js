import React, { useState, useContext } from "react";
import "../../styles/classDetails.css";
import { Context } from "../store/appContext";

function ClassDetails() {
    const { store } = useContext(Context);

    // Estado para la imagen de perfil
    const [profileImage, setProfileImage] = useState("https://xsgames.co/randomusers/avatar.php?g=female");

    // Definición de datos en función del rol
    const isTeacher = store.role?.includes("teacher");

    const profileData = isTeacher
        ? {
              name: "Camila Pérez",
              subtitle: "Estudiante de Bachillerato",
              description:
                  "En caso de no poder cumplir con la clase, debes cancelar con anticipación. Al estudiante le llegará una notificación de tu cancelación.",
              price: "$ 300",
              dashboardLink: "./teacherDashboard",
          }
        : {
              name: "Laura Gómez",
              subtitle: "Profesora particular de matemática",
              description:
                  "En caso de no poder asistir a la clase, debes cancelar con anticipación. Cancelaciones con menos de 2 hrs de antelación serán cobradas. Al profesor le llegará una notificación de la cancelación.",
              price: "$ 300",
              dashboardLink: "./studentDashboard",
          };

    return (
        <div className="class-container">
            <div className="pic-usuario">
                <img src={profileImage} alt="Perfil" className ="profe-image" />
                <div className="informacion-usuario">
                    <h2 className="profile-name">{profileData.name}</h2>
                    <h6 className="profesor mb-2 text-body-secondary">{profileData.subtitle}</h6>
                    <p className="descripcion">{profileData.description}</p>
                </div>
            </div>

            <div className="class-details-body">
                <h5 className="card-title">Detalles de la clase</h5>
                <div className="info-adicional">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Día: 19/12/24</li>
                        <li className="list-group-item">Horario: 08:00 a 09:00 hrs</li>
                        <li className="list-group-item">Modalidad: Online</li>
                        {!isTeacher && <li className="list-group-item">Nivel académico: Todos los niveles</li>}
                        <li className="list-group-item">Precio por hora: {profileData.price}</li>
                        <li className="list-group-item">Idiomas: Español</li>
                    </ul>
                </div>

                <div className="botones d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="volver-boton" type="button">
                        <a href={profileData.dashboardLink}>Ingresar a la clase</a>
                    </button>
                    <button className="volver-boton" type="button">
                        <a href={profileData.dashboardLink}>Cancelar</a>
                    </button>
                    <button className="volver-boton" type="button">
                        <a href={profileData.dashboardLink}>Volver</a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClassDetails;
