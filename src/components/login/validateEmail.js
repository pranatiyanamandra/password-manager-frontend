import React, { useState,useEffect } from "react";
import Modal from "../modal/modal";
import "./login.css"
import history from "../history/history";
import { check } from "../api/api";
import { connect } from "react-redux";
import { setEmailActionCreator } from "../../actions";
import Home from "../home/home";
const ValidateEmail = (props) => {

    const [found, setFound] = useState(true)

    useEffect(() => {
        const submit = (e) => {
          if(e.keyCode === 13){
            onNextClick(e);
          }
        }
        window.addEventListener('keydown', submit)
      return () => window.removeEventListener('keydown', submit)
    },[])

    const changeEmail = (event) => {
        props.setEmail(event.target.value)
    }

    const closeLoginModal = () => {
        props.setEmail("")
        history.push("/")
    }

    const onNextClick = (event) => {
        event.preventDefault();

        const body = {
            emailAddress: props.email,
            password: ""
        }
      
        const response = check(body);
        response.then((res) => {
            if (res.data.message === "User Found") {
                history.push("/login/" + window.btoa(props.email))
            }
            else {
               
                setFound(false)
            }
        })
    }

    const renderAccountNotFound = () => {
        return <h5 style={{ color: "red" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>Account Not Found</h5>
    }
    const renderModalContent = () => {
        return <>
            <div className="imgcontainer">
                <span className="close" title="Close" onClick={() => { closeLoginModal(); }}>&times;</span>
                <button title="avatar" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg></button>
            </div>

            <div className="my-container">
                <label htmlFor="email"><b>Email Address</b></label>
                <input type="text" placeholder="Enter Email Address" name="email" onChange={(event) => {
                    changeEmail(event)
                }} required />
                {found ? null : renderAccountNotFound()}
                <button className="btn btn-outline-light"
                    type="next"
                    disabled={(props.email === "")}
                    onClick={(event) => onNextClick(event)}
                >Next</button>
            </div>

            <div className="my-container" >
                {/* <span className="psw">Forgot <a href="#">password?</a></span> */}
            </div>
        </>
    }
    return <>
    <Home></Home>
        <Modal modalContent={renderModalContent()} onDismiss={closeLoginModal}></Modal>
    </>
}

const mapStateToProps = (state) => {
    return {
        email: state.email
    }

}

const mapDispatchToProps={
    setEmail: setEmailActionCreator
}

export default connect(mapStateToProps,mapDispatchToProps)(ValidateEmail);