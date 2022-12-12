import React from "react";
import { useEffect } from "react";
import "../profile.css";
import { connect } from "react-redux";
import { editProfile, getProfile } from "../../../api/api";
import { useState } from "react";
import history from "../../../history/history";
const EditProfile = (props) => {

    const [userData, setUserData] = useState({})
    const [err, setErr] = useState(false)

    useEffect(() => {
        const response = getProfile(window.btoa(props.email));
        response.then((res) => {
            const data = {
                "firstName": res.data.firstName,
                "lastName": res.data.lastName,
                "emailAddress":props.email
            }
            setUserData(data)
        }).catch((err)=>{
            setErr(true)
        })
    }, [])

    const onFieldChange=(event)=>{
        console.log("changed",)
        console.log(event.target.value," event.target.value")
        console.log(event ," event")
        console.log(userData ," userdata")

        console.log(event.target ," event")
        const val = event.target.value
        const key = event.target.getAttribute('id');
        userData[key]=val
        setUserData({...userData})
        console.log(userData ," after userdata")

    }

    const renderNotPerformed=()=>{
        return <h5 style={{ color: "red" }} >
        <svg title="error-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>Operation could not be performed.Please try again later.</h5>
    }

   const onSaveClick = ()=>{
        console.log(userData ," after on save click userdata")

       const response =  editProfile(window.btoa(props.email),userData);
       response.then((res)=>{
        if(res.data.message === "Edit successful"){
            history.push("/user/"+window.btoa(props.email)+"/profile")
        }
        else{
            setErr(true)
        }
       }).catch((err)=>{
        setErr(true)
       })
   }
    
    return <>
        <div class="jumbotron" style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%", backgroundColor: "#003b49", color: "white", overflow: "auto" }}>
            <h4 className="display-5">User Profile</h4>
            <hr class="my-4"></hr>
            <div class="form-group">
                <label for="exampleInputEmail1">First Name</label>
                <input type="text" class="form-control" data-testid="exampleFirstNameInput" id="firstName" aria-describedby="emailHelp" value={userData['firstName']} onChange={onFieldChange} placeholder="Last Name"></input>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Last Name</label>
                <input type="text" class="form-control" data-testid="exampleLastNameInput" id="lastName" aria-describedby="emailHelp" value={userData['lastName']} onChange={onFieldChange} placeholder="Last Name"></input>
            </div>
            <div className="form-group">
            <button className="btn btn-outline-light edit-icon"
                    type="next"
                    onClick={onSaveClick}
                    
                >Save</button>

            {err?renderNotPerformed():null}
            </div>
        </div>
    </>
}
const mapStateToProps = (state) => {
    return { email: state.email }
}
export default connect(mapStateToProps, null)(EditProfile);