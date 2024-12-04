import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SelectClass = () => {
    const { store, actions } = useContext(Context);

    return <div className="container mt-5">
            <h4 id="headerTitle">Resultados que coinciden con tu búsqueda</h4>           

                <div className="card" style={{ width: '18rem' }}>
                    <img src="https://t4.ftcdn.net/jpg/00/85/77/75/360_F_85777561_m6EMdjM6Knkz7OLJmN5zr5ZeK359S3G5.jpg" className="card-img-top" alt="foto de juan perez" />
                    <div className="card-body">

                        <h5 className="card-title">Juan Pérez</h5>
                        <p className="card-text">Calificación</p>
                        <a href="#" className="btn btn-primary">Ver disponibilidad</a>
                    </div>
                </div>
                
            </div>
        
    
}








export default SelectClass;