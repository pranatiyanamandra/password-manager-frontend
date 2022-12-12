import { render ,screen} from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducers from "../../reducers";
import { Router } from "react-router-dom";
import history from "../history/history";
import userEvent from "@testing-library/user-event"
import {server} from "../../mocks/server";
import { rest } from "msw";
import Register from "./register";
test('renders Register Modal with User Svg ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const userSvg = screen.getByTitle("avatar")
    expect(userSvg).toBeInTheDocument();
})

test('renders First Name field in Register Modal',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const firstNameField = screen.getByText("First Name")
    expect(firstNameField).toBeInTheDocument();
})

test('renders Last Name field in Register Modal',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const lastNameField = screen.getByText("Last Name")
    expect(lastNameField).toBeInTheDocument();
})

test('renders Email Address field in Register Modal',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const emailAddressField = screen.getByText("Email Address")
    expect(emailAddressField).toBeInTheDocument();
})

test('renders Password field in Register Modal',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const passwordField = screen.getByText("Password")
    expect(passwordField).toBeInTheDocument();
})

test('renders Confirm Password field in Register Modal',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const confirmPasswordField = screen.getByText("Confirm Password")
    expect(confirmPasswordField).toBeInTheDocument();
})

test('renders Register button in Register Modal',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const registerButton = screen.getByRole("button",{name:"Register"})
    expect(registerButton).toBeInTheDocument();
})

test('renders Register button to be disabled initially in Register Modal',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const registerButton = screen.getByRole("button",{name:"Register"})
    expect(registerButton).toBeDisabled();
})

test('enables Register button when all fields in Register Modal are filled',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const registerButton = screen.getByRole("button",{name:"Register"})
    const firstNameField = screen.getByPlaceholderText("Enter First Name")
    userEvent.type(firstNameField,"user")
    const lastNameField = screen.getByPlaceholderText("Enter Last Name")
    userEvent.type(lastNameField,"1")
    const emailAddressField = screen.getByPlaceholderText("Enter Email Address")
    userEvent.type(emailAddressField,"user@gmail.com")
    const passwordField = screen.getByPlaceholderText("Enter Password")
    userEvent.type(passwordField,"user")
    const confirmPasswordField = screen.getByPlaceholderText("Re-enter Password")
    userEvent.type(confirmPasswordField,"user")
    expect(registerButton).toBeEnabled();
})

test('disabled Register button when password field and confirm password field are not equal in Register Modal are filled',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const registerButton = screen.getByRole("button",{name:"Register"})
    const firstNameField = screen.getByPlaceholderText("Enter First Name")
    userEvent.type(firstNameField,"user")
    const lastNameField = screen.getByPlaceholderText("Enter Last Name")
    userEvent.type(lastNameField,"1")
    const emailAddressField = screen.getByPlaceholderText("Enter Email Address")
    userEvent.type(emailAddressField,"user@gmail.com")
    const passwordField = screen.getByPlaceholderText("Enter Password")
    userEvent.type(passwordField,"user")
    const confirmPasswordField = screen.getByPlaceholderText("Re-enter Password")
    userEvent.type(confirmPasswordField,"u")
    expect(registerButton).toBeDisabled();
})


test('renders Registration Unsuccessful when Response from backend is an error',async ()=>{
    server.resetHandlers(
        rest.post('http://localhost:8080/users/register',(req,res,ctx)=>{
            res(ctx.status(500)); 
        })
    )
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
    const registerButton = screen.getByRole("button",{name:"Register"})
    const firstNameField = screen.getByPlaceholderText("Enter First Name")
    userEvent.type(firstNameField,"user")
    const lastNameField = screen.getByPlaceholderText("Enter Last Name")
    userEvent.type(lastNameField,"1")
    const emailAddressField = screen.getByPlaceholderText("Enter Email Address")
    userEvent.type(emailAddressField,"user@gmail.com")
    const passwordField = screen.getByPlaceholderText("Enter Password")
    userEvent.type(passwordField,"user")
    const confirmPasswordField = screen.getByPlaceholderText("Re-enter Password")
    userEvent.type(confirmPasswordField,"user")
    userEvent.click(registerButton);
    const unsuccessfulRegister = await screen.findByText("Registration Unsuccessful.Please Try Again Later")
    expect(unsuccessfulRegister).toBeInTheDocument()
})

// test('redirects to Login url when Register button is clicked and response from backend is success in Register modal',()=>{
//     const store = createStore(reducers)
//     render(<Provider store={store}><Router history={history}><Register></Register></Router></Provider>)
//     const registerButton = screen.getByRole("button",{name:"Register"})
//     const firstNameField = screen.getByPlaceholderText("Enter First Name")
//     userEvent.type(firstNameField,"user")
//     const lastNameField = screen.getByPlaceholderText("Enter Last Name")
//     userEvent.type(lastNameField,"1")
//     const emailAddressField = screen.getByPlaceholderText("Enter Email Address")
//     userEvent.type(emailAddressField,"user@gmail.com")
//     const passwordField = screen.getByPlaceholderText("Enter Password")
//     userEvent.type(passwordField,"user")
//     const confirmPasswordField = screen.getByPlaceholderText("Re-enter Password")
//     userEvent.type(confirmPasswordField,"user")
//     userEvent.click(registerButton);
//     expect(history.location.pathname).toBe("/login")
// })

