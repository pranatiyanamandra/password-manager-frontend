import React from "react";

const Home=()=>{
    return <>
    <div  className="jumbotron" style={{backgroundColor:"#003b49",color:"white",zIndex:"-1"}}>
            <h1  className="display-4">Password Manager</h1>
            <p  className="lead">Store and Retrieve your passwords all in one place.</p>
            <hr  className="my-4"></hr>
            <p>It uses several security measures to ensure that your passwords are protected and not misused.</p>
    </div>
    </>
}

export default Home;