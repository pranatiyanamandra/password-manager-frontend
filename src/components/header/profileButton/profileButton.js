import React from "react";
import jwt from 'jwt-decode';
import { Link } from "react-router-dom";
import {connect} from "react-redux";

const ProfileButton=(props)=>{
  let decodedToken = props.token === "" ? "" : jwt(props.token)
    return <>
      <a  className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="#1b365d"  className="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
  </svg>
        </a>
        <div  className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link className="dropdown-item" to={"/user/"+window.btoa(decodedToken.sub)+"/profile"}  style={{color:"#1b365d"}}>Your Profile</Link>
        <div  className="dropdown-divider"></div>
        <Link className="dropdown-item" to={"/user/"+window.btoa(decodedToken.sub)+"/logout"}  style={{color:"#1b365d"}}> Logout</Link>
        </div>
  </>
}

const mapStateToProps=(state)=>{
  return {
    token:state.token
  }
}
export default connect(mapStateToProps,null)(ProfileButton);

        
