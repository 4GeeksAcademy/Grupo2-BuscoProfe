import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from 'react-router-dom';

export const SearchClass = () => {
    const { store, actions } = useContext(Context);

    return (
         <div id="searchClassForm">
            <h2 id="headerTitle">Buscar clase</h2>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Nivel</label>
                <select class="form-control" id="exampleFormControlSelect1">                   
                    <option>Ciclo Básico</option>
                    <option>Bachillerato</option>
                    <option>Terciario</option>                   
                </select>
                <label for="exampleFormControlSelect1">Materia</label>
                <select class="form-control" id="exampleFormControlSelect1">                   
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <label for="exampleFormControlSelect1">Franja horaria</label>
                <select class="form-control" id="exampleFormControlSelect1">                   
                    <option>Matutino</option>
                    <option>Vespertino</option>
                    <option>Nocturno</option>
                </select>
                
        
               
                      <Link to="/selectclass">
                        <button className="btn btn-success d-flex mx-auto">Buscar</button>
                      </Link>
                   
            </div>
        </div>

    )
}



export default SearchClass;     