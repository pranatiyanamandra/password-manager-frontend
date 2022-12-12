import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history/history";
import Home from "./home/home";
import ValidateEmail from "./login/validateEmail";
import ValidatePassword from "./login/validatePassword";
import Logout from "./logout/logout";
import Register from "./register/register";
import User from "./user/user";
import Profile from "./user/profile/profile";
import Header from "./header/header";
import EditProfile from "./user/profile/editProfile/editProfile";
import DisplayRecords from "./user/secretRecords/displayRecords";
import AddRecord from "./user/secretRecords/addRecord/addRecord";
import EditRecord from "./user/secretRecords/editRecord/editRecord";
import DeleteRecord from "./user/secretRecords/deleteRecord/deleteRecord";
const App=()=>{
    return <div>
        <Router history={history}>
            <>
            <Header></Header>
                <Switch>
                    <Route path="/" exact  component={Home}></Route>
                    <Route path="/login" exact  component={ValidateEmail}></Route>
                    <Route path="/login/:email" exact  component={ValidatePassword}></Route>
                    <Route path="/user/:email" exact component={User}></Route>
                    <Route path="/user/:email/profile" exact component={Profile}></Route>
                    <Route path="/user/:email/profile/edit" exact component={EditProfile}></Route>
                    <Route path="/register" exact component={Register}></Route>
                    <Route path="/user/:email/logout" component={Logout}></Route>
                    <Route path="/user/:email/secret-records" exact component={DisplayRecords}></Route>
                    <Route path="/user/:email/secret-records/create" exact component={AddRecord}></Route>
                    <Route path="/user/:email/secret-records/:index" exact component={EditRecord}></Route>
                    <Route path="/user/:email/secret-records/:index/delete" exact component={DeleteRecord}></Route>
                </Switch>
            </>
        </Router>
    </div>
}
export default App;