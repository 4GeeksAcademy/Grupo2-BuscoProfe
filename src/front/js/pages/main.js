import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";



const Main = () => {
    const { store, actions } = useContext(Context);


    console.log(localStorage.getItem("idToken"))
    console.log(store.user)
    console.log(store.token)
    if (store.user && store.token) {
        console.log("hay user y token")
        if (store.user.typeUser == "student") {
            return <StudentDashboard />;
        } else {
            return <TeacherDashboard />;
        }
    } else {
        return (<div style={{ marginTop: "90px" }} >error</div>)
    }

}




export default Main