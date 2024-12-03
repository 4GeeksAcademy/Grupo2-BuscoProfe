import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SelectClass = () => {
    const { store, actions } = useContext(Context);

    return (
        <div id="searchClassForm">
            <h2 id="headerTitle">Seleccionar clase</h2>
            
        </div>

    )
}








export default SelectClass;