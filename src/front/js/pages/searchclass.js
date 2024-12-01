import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const SearchClass = () => {
    const { store, actions } = useContext(Context);

    return (
        // <div id="searchClassForm">
        //     <h2 id="headerTitle">Buscar clase</h2>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Example select</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>

        // </div>

    )
}



export default SearchClass;     