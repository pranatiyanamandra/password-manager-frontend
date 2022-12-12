import { render,screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Header from "./header"
import { createStore } from "redux"
import reducers from "../../reducers";
import { Router } from "react-router-dom";
import history from "../history/history";
import { Provider } from "react-redux"

function combined(state = {}, action) {
    return {
     token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcmFuYXRpQGdtYWlsLmNvbSIsImV4cCI6MTY2NTE3NjM3MSwiaWF0IjoxNjY1MTU4MzcxfQ.KLiPVm0okmAK_OacoNnheYJirPe_7We-PiDMli9JAr2ixTP3cYpxACWGfU6PjFEOv5U8RF9pBUDkIFuctGAefw"
    }
}

test('renders Password Manager',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Header></Header></Router></Provider>)
    const element = screen.getByText("Password Manager")
    expect(element).toBeInTheDocument()
})

test('renders Login link',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Header></Header></Router></Provider>)
    const loginLink = screen.getByRole("link",{name:"Login"})
    expect(loginLink).toBeInTheDocument()
})
test('renders Register link',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Header></Header></Router></Provider>)
    const registerLink = screen.getByRole("link",{name:"Register"})
    expect(registerLink).toBeInTheDocument()
})
test('redirects to login page when login link is clicked',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Header></Header></Router></Provider>)
    const loginLink = screen.getByRole("link",{name:"Login"})
    userEvent.click(loginLink)
    expect(window.location.pathname).toBe("/login")
})

test('redirects to Register page when login link is clicked',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Header></Header></Router></Provider>)
    const registerLink = screen.getByRole("link",{name:"Register"})
    userEvent.click(registerLink)
    expect(window.location.pathname).toBe("/register")
})

test('renders Your Secret Records link when user has logged in ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><Header></Header></Router></Provider>)
    const secretRecords  = screen.getByRole("link",{name:"Your Secret Records"})
    expect(secretRecords).toBeInTheDocument()
})

test('redirects to Secret Records page when secret records link is clicked ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><Header></Header></Router></Provider>)
    const secretRecords  = screen.getByRole("link",{name:"Your Secret Records"})
    userEvent.click(secretRecords)
    expect(window.location.pathname).toBe("/user/cHJhbmF0aUBnbWFpbC5jb20=/secret-records")
})