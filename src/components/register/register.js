import React,{useState} from "react";
import Modal from "../modal/modal";
import "./register.css"
import history from "../history/history";
import { register } from "../api/api";
import Home from "../home/home";
const Register = (props) => {

    const [success,setSuccess] = useState(true)
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()
    const [eye1, setEye1] = useState(false);
    const [eye2, setEye2] = useState(false);


    const [password,setPassword] = useState()

    const [confirmedPassword,setConfirmedPassword] = useState()

    const changeFirstName=(event)=>{
        setFirstName(event.target.value)
    }

    const changeLastName=(event)=>{
        setLastName(event.target.value)
    }

    const changeEmail=(event)=>{
        setEmail(event.target.value)
    }

    const changePassword=(event)=>{
        setPassword(event.target.value)
    }

    const changeConfirmedPassword=(event)=>{
        setConfirmedPassword(event.target.value)
    }

    const renderRegistrationUnsuccessful = () => {
        return <h5 style={{ color: "red" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>Registration Unsuccessful.Please Try Again Later</h5>
    }
    
    const closeRegisterModal=()=>{
        history.push("/")
    }

    const onSubmitClick=(event)=>{
        event.preventDefault();
        const body = {  
            firstName:firstName,
            lastName:lastName,
            emailAddress:email,
            password:password
        }
        const response = register(body);
        response.then((res)=>{
            if(res.status === 200 && res.data.message === "Registered Successfully"){
                history.push("/login")
            }

        }).catch((err)=>{
            setSuccess(false)
        })

    }

    const onEye1Click = () => {
        setEye1(!eye1)
    }
    const onEye2Click = () => {
        setEye2(!eye2)
    }

    const renderModalContent = () => {
        return <>
            <div className="imgcontainer">
                <span className="close" title="Close" onClick={()=>{closeRegisterModal();}}>&times;</span>
                <button title= "avatar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg></button>
            </div>

            <div className="my-container">
                <label htmlFor="firstname"><b>First Name</b></label>
                <input type="text" placeholder="Enter First Name" name="firstname" onChange={(event)=>{
                    changeFirstName(event)
                }} value={firstName} required />

                <label htmlFor="lastname"><b>Last Name</b></label>
                <input type="text" placeholder="Enter Last Name" name="lastname" onChange={(event)=>{
                    changeLastName(event)
                }} value={lastName} required />

                <label htmlFor="email"><b>Email Address</b></label>
                <input type="text" placeholder="Enter Email Address" name="email" onChange={(event)=>{
                    changeEmail(event)
                }} value={email} required />

                <div className="input-group mb-3">
                <label htmlFor="psw"><b>Password</b></label>
                <input type={eye1 ? "text" : "password"} className="form-control" placeholder="Enter Password" name="psw" required onChange={(event)=>{
                    changePassword(event)
                }}value={password} />
                <div class="input-group-append" onClick={onEye1Click}>
                    <span class="input-group-text" id="basic-addon2">
                        {eye1 ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                        </svg>}
                    </span>
                </div>
                </div>

                <div className="input-group mb-3">

                <label htmlFor="confirm-psw"><b>Confirm Password</b></label>
                <input type={eye2 ? "text" : "password"} className="form-control" placeholder="Re-enter Password" name="confirm-psw" required onChange={(event)=>{
                    changeConfirmedPassword(event)
                }} value={confirmedPassword} />
                <div class="input-group-append" onClick={onEye2Click}>
                    <span class="input-group-text" id="basic-addon2">
                        {eye2 ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                        </svg>}
                    </span>
                </div>
                </div>
                {success ? null : renderRegistrationUnsuccessful()}
                <button className="register-btn btn-outline-info"
                 disabled = {email === undefined || firstName === undefined || lastName === undefined || (password !== confirmedPassword || password===undefined) ? true : false}
                 onClick={(event)=>onSubmitClick(event)}>
                Register
                </button>
            </div>

            <div className="my-container" >
            </div>
        </>
    }
    return <>
        <Home></Home>

        <Modal modalContent={renderModalContent()} onDismiss={closeRegisterModal}></Modal>
    </>
}

export default Register;