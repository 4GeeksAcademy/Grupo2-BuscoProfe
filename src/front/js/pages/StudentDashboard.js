import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/StudentDashboard.css';
import { TeacherProfiles} from "./selectclass" 

function StudentDashboard() {
  // Estado para la imagen de perfil
  // const [profileImage, setProfileImage] = useState("https://xsgames.co/randomusers/avatar.php?g=pixel");
  const {actions, store}=useContext(Context)

  // Función para cambiar la imagen aleatoria
  // const changeProfileImage = () => {
  //   const randomGender = Math.random() > 0.5 ? 'male' : 'female'; // Aleatoriza entre masculino o femenino
  //   setProfileImage(`https://xsgames.co/randomusers/avatar.php?g=${randomGender}`);
  // };

  useEffect(() => {
    // Cambia la imagen cuando el componente se monta
    // changeProfileImage();
    actions.getTeachers("matematica")
  }, []); 

  return (
    <div className="studentdashboard-container">

      <div className="student-perfil">
        <img
          src={store.user?.photo} 
          alt="Estudiante"
          className="profe-image"
        />
        <h2 className="profile-name">{store.user?.name}</h2>
      </div>

      {/* Stats */}
      <div className="classes-and-recommendations">
        <div className="clases-agendadas">
          <div className="tabla">
            <div className="tablah2">
              <h2>Clases Agendadas</h2>
            </div>
            <table>
              <tr>
                <th>Profesor</th>
                <th>Fecha y hora</th>
                <th>Materia</th>
              </tr>
              <tr>
                <td>John Doe</td>
                <td>13/04/12 14:40</td>
                <td>Matematica</td>
                <td><a href="#" className="vermas">Ver mas</a></td>
              </tr>
              
              <tr>
                <td>John Doe</td>
                <td>13/04/12 14:40</td>
                <td>Matematica</td>
                <td><a href="#" className="vermas">Ver mas</a></td>
              </tr>

              <tr>
                <td>John Doe</td>
                <td>13/04/12 14:40</td>
                <td>Matematica</td>
                <td><a href="#" className="vermas">Ver mas</a></td>
              </tr>

              <tr>
                <td>John Doe</td>
                <td>13/04/12 14:40</td>
                <td>Matematica</td>
                <td><a href="#" className="vermas">Ver mas</a></td>
              </tr>

              <tr>
                <td>John Doe</td>
                <td>13/04/12 14:40</td>
                <td>Matematica</td>
                <td><a href="#" className="vermas">Ver mas</a></td>
              </tr>
              <tr>
                <td>John Doe</td>
                <td>13/04/12 14:40</td>
                <td>Matematica</td>
                <td><a href="#" className="vermas">Ver mas</a></td>
              </tr>
            </table>
          </div>
        </div>

        {/* <section className="student-recomend">
          <h2>Recomendados para ti</h2>
          <div className="teacher-grid">
            {Array(7).fill(null).map((_, index) => (
              <div className="teacher-card" key={index}>
                <img
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                  alt="Profesor"
                  className="teacher-image"
                />
                <div className="teacher-info">
                  <div className="teacher-name">Nombre del Profesor</div>
                  <div className="teacher-profession">Profesión</div>
                  <div className="teacher-subjects">Materias: Matemáticas</div>
                  <div className="teacher-rating">Calificación: ⭐⭐⭐⭐</div>
                  <div className="teacher-price">Precio: $50/hora</div>
                  <button className="availability-button">Ver Disponibilidad</button>
                </div>
              </div>
            ))}
          </div>
        </section> */}
        <TeacherProfiles title="Recomendados para ti"/>
      </div>
    </div>
  );
}

export default StudentDashboard;
