import { render,screen} from "@testing-library/react"
import ProfileButton from "./profileButton"
import {Router} from "react-router-dom";
import history from "../../history/history";
import userEvent from '@testing-library/user-event';
import { createStore } from "redux"
import reducers from "../../../reducers";
import { Provider } from "react-redux"

function combined(state = {}, action) {
    return {
     token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcmFuYXRpQGdtYWlsLmNvbSIsImV4cCI6MTY2NTE3NjM3MSwiaWF0IjoxNjY1MTU4MzcxfQ.KLiPVm0okmAK_OacoNnheYJirPe_7We-PiDMli9JAr2ixTP3cYpxACWGfU6PjFEOv5U8RF9pBUDkIFuctGAefw"
    }
}

test('renders the link Your Profile',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ProfileButton></ProfileButton></Router></Provider>)
    const profileLink = screen.getByRole('link',{name:"Your Profile"})
    expect(profileLink).toBeInTheDocument()

})

test('renders the link Logout',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ProfileButton></ProfileButton></Router></Provider>)
    const logoutLink = screen.getByRole('link',{name:"Logout"})
    expect(logoutLink).toBeInTheDocument()

})

test('redirect to user profile url when Your Profile link is called',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><ProfileButton></ProfileButton></Router></Provider>)
    const profileLink = screen.getByRole('link',{name:"Your Profile"})
    userEvent.click(profileLink);
    const expectedToken = "cHJhbmF0aUBnbWFpbC5jb20=";
    expect(window.location.pathname).toBe("/user/"+expectedToken+"/profile")
})

test('redirect to user logout url when Your Profile link is called',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><ProfileButton></ProfileButton></Router></Provider>)
    const logoutLink = screen.getByRole('link',{name:"Logout"})
    userEvent.click(logoutLink);
    const expectedToken = "cHJhbmF0aUBnbWFpbC5jb20=";
    expect(window.location.pathname).toBe("/user/"+expectedToken+"/logout")
})