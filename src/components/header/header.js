import React from "react";
import { Link } from "react-router-dom";
import "./header.css"
import ProfileButton from "./profileButton/profileButton";
import { connect } from "react-redux";
import jwt from 'jwt-decode';
const Header = (props) => {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">Password Manager</Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link className="nav-item nav-link active" to="/">Home</Link>
                </li>

                {props.token === "" ?
                    <>
                        <li className="nav-item">
                            <Link className="nav-item nav-link active " to="/register">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg> Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-item nav-link active " to="/login">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" fill="currentColor"
                                    className="bi bi-key-fill"
                                    viewBox="0 0 16 16">
                                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                </svg>
                                Login
                            </Link>
                        </li>
                    </>
                    :
                    <>
                        <li className="nav-item ">
                            <Link className="nav-item nav-link active " to={"/user/"+window.btoa(jwt(props.token).sub)+"/secret-records"}>
                                Your Secret Records
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <ProfileButton></ProfileButton>
                        </li>
                    </>
                }
            </ul>
        </div>
    </nav>


}
const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps, null)(Header);

