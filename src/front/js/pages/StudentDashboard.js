import React from "react";
import '../../styles/StudentDashboard.css';

function StudentDashboard() {
  return (
    <div className="dashboard-container" style={{ marginTop: "90px", width: "80vw" }}>
      {/* Header */}
      <header className="dashboard-header">
        <span className="student-name"><i className="fa fa-user p-3"></i></span>
        <a href="/profile" className="profile-link">
          <span className="student-name">NOMBRE</span>
        </a>
      </header>

      {/* Stats */}
      <div className="wrapper">
        <div className="classes-and-recommendations">
          <div className="card-title">Mis clases</div>
          <section className="dashboard-stats">
            <div className="stat-box d-flex justify-content-between">
              <div className="d-flex flex-column">
                <div>Nombre del profesor</div>
                <div>Clase</div>
              </div>
              <div>
                <a href="/#" className="card-link">
                  <span className="student-name">Acceder</span>
                </a></div>
            </div>
            <div className="stat-box d-flex justify-content-between">
              <div className="d-flex flex-column">
                <div>Nombre del profesor</div>
                <div>Clase</div>
              </div>
              <div>
                <a href="/#" className="card-link">
                  <span className="student-name">Acceder</span>
                </a></div>
            </div>
            <div className="stat-box d-flex justify-content-between">
              <div className="d-flex flex-column">
                <div>Nombre del profesor</div>
                <div>Clase</div>
              </div>
              <div>
                <a href="/#" className="card-link">
                  <span className="student-name">Acceder</span>
                </a></div>
            </div>
          </section>


          <div className="card-title">Recomendaciones</div>

          <section className="dashboard-stats ">
            <div className="stat-box d-flex justify-content-between">
              <div className="d-flex flex-column">
                <div>Nombre del profesor</div>
                <div>Clase</div>
              </div>
              <div>
                <a href="/#" className="card-link">
                  <span className="student-name">Comprar</span>
                </a></div>
            </div>
            <div className="stat-box d-flex justify-content-between">
              <div className="d-flex flex-column">
                <div>Nombre del profesor</div>
                <div>Clase</div>
              </div>
              <div>
                <a href="/#" className="card-link">
                  <span className="student-name">Comprar</span>
                </a></div>
            </div>
            <div className="stat-box d-flex justify-content-between">
              <div className="d-flex flex-column">
                <div>Nombre del profesor</div>
                <div>Clase</div>
              </div>
              <div>
                <a href="/#" className="card-link">
                  <span className="student-name">Comprar</span>
                </a></div>
            </div>
          </section>
        </div>
        <div className="calendar">acá va el calendario</div>
      </div>

      {/* Classes
      <section className="dashboard-classes">
        <h2>Mis clases</h2>
        <div className="class-box">Clase 1</div>
        <div className="class-box">Clase 2</div>
        <div className="class-box">Clase 3</div>
      </section> */}
    </div>
  );
}

export default StudentDashboard;
