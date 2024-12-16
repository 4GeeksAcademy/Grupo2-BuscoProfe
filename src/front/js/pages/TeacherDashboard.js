import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de importar Context
import { useNavigate } from "react-router-dom";
import '../../styles/TeacherDashboard.css';

function TeacherDashboard() {
  const { actions,store } = useContext(Context);
  const navigate = useNavigate();

  // Estado para la imagen de perfil
  // // const [profileImage, setProfileImage] = useState("https://xsgames.co/randomusers/avatar.php?g=pixel");

  // Función para cambiar la imagen aleatoria
  // const changeProfileImage = () => {
  //   const randomGender = Math.random() > 0.5 ? 'male' : 'female'; // Aleatoriza entre masculino o femenino
  //   setProfileImage(`https://xsgames.co/randomusers/avatar.php?g=${randomGender}`);
  // };

  useEffect(() => {
    // Cambia la imagen cuando el componente se monta
    // changeProfileImage();
    actions.getTeacherPerfil()
  }, []); 

  return (
    <div className="dashboard-container">
      <div className="container-perfil">
        <img
          src={store.teacher.image} 
          alt="Profesor"
          className="profe-image"
        />
        <h2 className="profile-name">{store.teacher.name}</h2>
      </div>

      <div className="tarjetas">
        <div className="cards">
          <div className="card">
            <h1>94</h1>
            <h3>Estudiantes</h3>
          </div>

          <div className="card">
            <h1>5</h1>
            <h3>Estudiantes Nuevos</h3>
          </div>

          <div className="card">
            <h1>2</h1>
            <h3>Comentarios nuevos</h3>
          </div>

          <div className="card">
            <h1>7</h1>
            <h3>Clases Agendadas</h3>
          </div>
        </div>
      </div>

      <div className="content-2">
        <div className="recent-payments">
          <div className="title">
            <h2>Clases Agendadas</h2>
          </div>
          <table>
            <tr>
              <th>Estudiante</th>
              <th>Fecha y hora</th>
              <th>Precio/hs</th>
              <th></th>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>13/04/12 14:40</td>
              <td>$120</td>
              <td><a href="#" className="vermas">Ver mas</a></td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>13/04/12 14:40</td>
              <td>$120</td>
              <td><a href="#" className="vermas">Ver mas</a></td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>13/04/12 14:40</td>
              <td>$120</td>
              <td><a href="#" className="vermas">Ver mas</a></td>
            </tr>
          </table>
        </div>
      </div>

      <div className="content-3">
        <div className="new-students">
          <div className="title">
            <h2>New Students</h2>
          </div>

          <table>
            <tr>
              <th>Name</th>
            </tr>
            <tr>
              <td>John Steve Doe</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
