import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SelectClass = () => {
    const { store, actions } = useContext(Context);

    return <div className="container-cards">
            <h4 id="headerTitle">Resultados que coinciden con tu búsqueda</h4>           

                <div className="card-select" style={{ maxWidth: '250px' }}>
                    <p className="card-text">Materias:</p>
                    <img src="https://t4.ftcdn.net/jpg/00/85/77/75/360_F_85777561_m6EMdjM6Knkz7OLJmN5zr5ZeK359S3G5.jpg" className="card-img-top rounded-circle" alt="foto de juan perez" />
                    <div className="card-body">
                        <h5 className="card-title"><strong>Juan Pérez</strong></h5>
                        <p className="card-sub-title"><strong>Ingeniero en sistemas</strong></p>
                        <p className="card-text">Calificación:</p>
                        <p className="card-text">Precio x hr:</p>
                        <a href="#" className="btn btn-primary">Ver disponibilidad</a>
                    </div>
                </div>
                <div className="card-select" style={{ maxWidth: '250px' }}>
                    <p className="card-text">Materias:</p>
                    <img src="https://t4.ftcdn.net/jpg/00/85/77/75/360_F_85777561_m6EMdjM6Knkz7OLJmN5zr5ZeK359S3G5.jpg" className="card-img-top rounded-circle" alt="foto de juan perez" />
                    <div className="card-body">
                        <h5 className="card-title"><strong>Juan Pérez</strong></h5>
                        <p className="card-sub-title"><strong>Ingeniero en sistemas</strong></p>
                        <p className="card-text">Calificación:</p>
                        <p className="card-text">Precio x hr:</p>
                        <a href="#" className="btn btn-primary">Ver disponibilidad</a>
                    </div>
                </div>
                <div className="card-select" style={{ maxWidth: '250px' }}>
                    <p className="card-text">Materias:</p>
                    <img src="https://t4.ftcdn.net/jpg/00/85/77/75/360_F_85777561_m6EMdjM6Knkz7OLJmN5zr5ZeK359S3G5.jpg" className="card-img-top rounded-circle" alt="foto de juan perez" />
                    <div className="card-body">
                        <h5 className="card-title"><strong>Juan Pérez</strong></h5>
                        <p className="card-sub-title"><strong>Ingeniero en sistemas</strong></p>
                        <p className="card-text">Calificación:</p>
                        <p className="card-text">Precio x hr:</p>
                        <a href="#" className="btn btn-primary">Ver disponibilidad</a>
                    </div>
                </div>
                <div className="card-select" style={{ maxWidth: '250px' }}>
                    <p className="card-text">Materias:</p>
                    <img src="https://t4.ftcdn.net/jpg/00/85/77/75/360_F_85777561_m6EMdjM6Knkz7OLJmN5zr5ZeK359S3G5.jpg" className="card-img-top rounded-circle" alt="foto de juan perez" />
                    <div className="card-body">
                        <h5 className="card-title"><strong>Juan Pérez</strong></h5>
                        <p className="card-sub-title"><strong>Ingeniero en sistemas</strong></p>
                        <p className="card-text">Calificación:</p>
                        <p className="card-text">Precio x hr:</p>
                        <a href="#" className="btn btn-primary">Ver disponibilidad</a>
                    </div>
                </div>
            </div>
        
    
}








export default SelectClass;