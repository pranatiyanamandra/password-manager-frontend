import React from "react";
import { useEffect } from "react";
import "./profile.css";
import { connect } from "react-redux";
import { getProfile } from "../../api/api";
import { useState } from "react";
import history from "../../history/history";
const Profile = (props) => {

    const [userData, setUserData] = useState({})
    const [err, setErr] = useState(false)


    useEffect(() => {
        const response = getProfile(window.btoa(props.email));
        response.then((res) => {
            setUserData({
                "firstName": res.data.firstName,
                "lastName": res.data.lastName
            })
        }).catch((err)=>{
            setErr(true)
        })
    }, [])

    const renderNotPerformed = () => {
        return <h5 style={{ color: "red" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>Unable to fetch data.Please try again later.</h5>
    }

    const onEditClick=()=>{
        history.push(window.location.pathname+"/edit")
    }
    return <>
        <div class="jumbotron" style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%", backgroundColor: "#003b49", color: "white", overflow: "auto" }}>
            <h4 className="display-5">User Profile
                <span className="edit-icon" onClick={onEditClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </span>
            </h4>
            <hr class="my-4"></hr>
            {err?renderNotPerformed():
            <>
            <div class="form-group">
                <label for="exampleInputEmail1">First Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.firstName} placeholder="Last Name"></input>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Last Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.lastName} placeholder="Last Name"></input>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Email Address</label>
                <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Email Address" value={props.email}></input>
            </div></>}
        </div>
    </>
}
const mapStateToProps = (state) => {
    return { email: state.email }
}
export default connect(mapStateToProps, null)(Profile);