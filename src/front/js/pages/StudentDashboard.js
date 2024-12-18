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
                <td>Ana Pascal</td>
                <td>19/12/24 12:00</td>
                <td>Física</td>
                <td><a href="./classDetails" className="vermas">Ver mas</a></td>
              </tr>

              <tr>
                <td>Pedro Canale</td>
                <td>22/12/24 10:00</td>
                <td>Literatura</td>
                <td><a href="#" className="vermas">Ver mas</a></td>
              </tr>
              <tr>
                <td>Carlos Olivera</td>
                <td>28/12/24 15:00</td>
                <td>Física</td>
                <td><a href="#" className="vermas">Ver mas</a></td>
              </tr>
              
            </table>
          </div>
        </div>

     
        <TeacherProfiles title="Recomendados para ti"/>
      </div>
    </div>
  );
}

export default StudentDashboard;
