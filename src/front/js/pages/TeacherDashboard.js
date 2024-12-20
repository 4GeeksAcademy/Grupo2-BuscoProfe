import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de importar Context
import { useNavigate } from "react-router-dom";
import '../../styles/TeacherDashboard.css';
import TeacherCalendar from './teacherCalendar';

function TeacherDashboard() {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();
  const handlePhoto = () => {
    actions.updateTeacherPhoto(store.user.id, photo)
  }

  const scheduledDates = [
    { student_name: "Jorge", date: "2024-12-02", start: "09:00", end: "10:00", subject: "Historia" },
    { student_name: "Pedro", date: "2024-12-12", start: "14:00", end: "15:00", subject: "Quimica" },
    { student_name: "Marcela", date: "2024-12-16", start: "09:00", end: "11:00", subject: "Filosofia" }
  ];

  useEffect(() => {

    actions.getTeacherPerfil()
  }, []);

  return (
    <div className="dashboard-container" style={{ width: "100%" }}>
      <div className="container-perfil">
        <img
          src={!photo ? store.teacher.image : URL.createObjectURL(photo)}
          alt="Profesor"
          className="profe-image"
        />
        <h2 className="profile-name">{store.teacher.name}</h2>
        {/* <input type="file" onChange = {event => setPhoto(event.target.files[0])} />
        <button className= "btn btn-light" onClick={handlePhoto} >Subir foto</button> */}

      </div>

      <div className="tarjetas">
        <div className="cards">
          <div className="card">
            <h1>23</h1>
            <h3>Estudiantes totales</h3>
          </div>

          <div className="card">
            <h1>5</h1>
            <h3>Estudiantes nuevos</h3>
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
              <td>Camila Pérez</td>
              <td>19/12/24 08:00</td>
              <td>$ 300</td>
              <td><a href="./classDetails" className="vermas">Ver mas</a></td>
            </tr>
            <tr>
              <td>Sofía Borges</td>
              <td>22/12/24 10:00</td>
              <td>$ 300</td>
              <td><a href="#" className="vermas">Ver mas</a></td>
            </tr>
            <tr>
              <td>Sebastián Martínez</td>
              <td>28/12/24 15:0</td>
              <td>$ 300</td>
              <td><a href="#" className="vermas">Ver mas</a></td>
            </tr>
          </table>
        </div>
      </div>

      <div className="content-3">
        <div className="new-students">
          <div className="title">
            <h2>Nuevos estudiantes</h2>
          </div>

          <table>
            <tr>
              <th>Nombre</th>
            </tr>
            <tr>
              <td>Mateo Silva</td>
            </tr>
          </table>
        </div>
      </div>
        <TeacherCalendar scheduledDates={scheduledDates} />
    </div>

  );
}

export default TeacherDashboard;
