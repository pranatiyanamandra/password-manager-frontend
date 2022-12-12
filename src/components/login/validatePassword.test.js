import { render ,screen} from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducers from "../../reducers";
import { Router } from "react-router-dom";
import history from "../history/history";
import userEvent from "@testing-library/user-event"
import {server} from "../../mocks/server";
import { rest } from "msw";
import ValidatePassword from "./validatePassword";

test('renders Login Modal with Door Svg ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidatePassword/></Router></Provider>)
    const doorSvg = screen.getByTitle("avatar")
    expect(doorSvg).toBeInTheDocument();
})


test('renders Password text in Login Stage 2',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidatePassword/></Router></Provider>)
    const passwordField = screen.getByText("Password")
    expect(passwordField).toBeInTheDocument();
})

test('renders Login Button in Login Stage 2',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidatePassword/></Router></Provider>)
    const loginButton = screen.getByRole("button",{name:"Login"})
    expect(loginButton).toBeInTheDocument();
})

test('renders Login Button disabled  in Login Stage 2',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidatePassword/></Router></Provider>)
    const loginButton = screen.getByRole("button",{name:"Login"})
    expect(loginButton).toBeDisabled();
})

// test('redirects to Login url when Login Button is clicked in Login Stage 2',()=>{
//     const store = createStore(reducers)
//     render(<Provider store={store}><Router history={history}><ValidatePassword/></Router></Provider>)
//     const loginButton = screen.getByRole("button",{name:"Login"})
//     expect(loginButton).toBeInTheDocument();
//     userEvent.click(loginButton)
//     expect(window.location.pathname).toBe("/user/")
// })

test('renders Incorrect Password when Response from backend is an error',async ()=>{
    server.resetHandlers(
        rest.post('http://localhost:8080/users/login',(req,res,ctx)=>{
            res(ctx.status(500)); 
        })
    )
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidatePassword/></Router></Provider>)
    const passwordInput = screen.getByPlaceholderText("Enter Password")
    userEvent.type(passwordInput,"user")
    const loginButton = screen.getByRole("button",{name:"Login"})
    userEvent.click(loginButton);
    const incorrectPassword = await screen.findByText("Password Incorrect")
    expect(incorrectPassword).toBeInTheDocument()
})

test('enables Login button when password ield in Login Stage 2 Modal are filled',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidatePassword/></Router></Provider>)
    const loginButton = screen.getByRole("button",{name:"Login"})
    const passwordField = screen.getByPlaceholderText("Enter Password")
    userEvent.type(passwordField,"user")
    expect(loginButton).toBeEnabled();
})
