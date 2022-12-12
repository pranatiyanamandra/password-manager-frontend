import React from "react";
import { useState } from "react";
import {connect} from "react-redux";
import history from "../../../history/history";
import { addRecord } from "../../../api/api";
const AddRecord = (props) => {
    const [secretRecord,setSecretRecord] = useState({'Title':undefined,'Email':undefined,'User Name':undefined,'Password':undefined})
    const [err, setErr] = useState(false)

    const onAddClick = ()=>{
        const response = addRecord(window.btoa(props.email),secretRecord);
        response.then((res)=>{
         if(res.data.message === "Added Field successfully"){
             history.push("/user/"+window.btoa(props.email)+"/secret-records")
         }
        }).catch((err)=>{
            setErr(true)
        })
    }

    const renderNotPerformed=()=>{
        return <h5 style={{ color: "red" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>Operation could not be performed.Please try again later.</h5>
    }

    return <div class="jumbotron" style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%", backgroundColor: "#003b49", color: "white", overflow: "auto" }}>
        <h4 className="display-5">Create Secret Record
        </h4>
        <hr class="my-4"></hr>
        <div class="form-group raised-segment" >
            <h6 className="display-5">New Record

            </h6>
            <label for="InputTitle">Title</label>
            <input type="text" class="form-control"
             data-testid="InputTitle" aria-describedby="titleHelp" 
             placeholder="Enter Title" value={secretRecord['Title']} 
             onChange={(event)=>{
                setSecretRecord(prevState => ({
                    ...prevState,
                    'Title' : event.target.value
                }))}}
             ></input>
            <label for="InputEmail">Email</label>
            <input type="text" class="form-control" 
            data-testid="InputEmail" aria-describedby="emailHelp" 
            placeholder="Enter Email" value={secretRecord['Email']}  
            onChange={(event)=>{
                setSecretRecord(prevState => ({
                    ...prevState,
                    'Email' : event.target.value
                }))                
                }}></input>
            <label for="InputUserName">User Name</label>
            <input type="text" class="form-control" 
            data-testid="InputUserName" aria-describedby="userNameHelp" 
            placeholder="Enter User Name" value={secretRecord['User Name']} 
            onChange={(event)=>{
                setSecretRecord(prevState => ({
                    ...prevState,
                    'User Name' : event.target.value
                }))    
            }}></input>
            <label for="InputPassword">Password</label>
            <input type="text" class="form-control" 
            data-testid="InputPassword" aria-describedby="passwordHelp" 
            placeholder="Enter Password" value={secretRecord['Password']} 
            onChange={(event)=>{
                setSecretRecord(prevState => ({
                    ...prevState,
                    'Password' : event.target.value
                }))   
            }}></input>
            <h6 className="display-5">Add Additional Fields
            </h6>
            <p>Coming soon...</p>
        </div>
        <button className="btn btn-outline-light edit-icon"
                    type="next"
                    onClick={onAddClick}
                    
                >Save</button>

            {err?renderNotPerformed():null}
    </div>
}

const mapStateToProps=(state)=>{
    return {
        email:state.email
    }

}
export default connect(mapStateToProps,null)(AddRecord);