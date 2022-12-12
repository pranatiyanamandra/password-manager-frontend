import { render ,screen} from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event"
import { rest } from "msw";
import history from "../../../history/history";
import EditProfile from "./editProfile";
import {server} from "../../../../mocks/server";
function combined(state = {}, action) {
    return {
     email:""
    }
}

test('renders User Profile Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><EditProfile></EditProfile></Router></Provider>)
    const userProfileHeading = screen.getByText("User Profile")
    expect(userProfileHeading).toBeInTheDocument();
})


test('renders First Name Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><EditProfile></EditProfile></Router></Provider>)
    const firstNameHeading = screen.getByText("First Name")
    expect(firstNameHeading).toBeInTheDocument();
})

test('renders Last Name Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><EditProfile></EditProfile></Router></Provider>)
    const lastNameHeading = screen.getByText("Last Name")
    expect(lastNameHeading).toBeInTheDocument();
})

test('renders Save button ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><EditProfile></EditProfile></Router></Provider>)
    const saveButton = screen.getByRole("button",{name:"Save"})
    expect(saveButton).toBeInTheDocument();
})

test('renders Unable to perform operation when save button is clicked and 500 response is returned',async()=>{
    server.resetHandlers(
        rest.put('http://localhost:8080/users//data',(req,res,ctx)=>{
            return res(ctx.json({
                "message":"Edit failed"
            }))
        })
    )
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><EditProfile></EditProfile></Router></Provider>)
    const firstNameInput = screen.getByTestId("exampleFirstNameInput")
    const lastNameInput = screen.getByTestId("exampleLastNameInput")
    userEvent.type(firstNameInput,"user")
    userEvent.type(lastNameInput," ")
    const saveButton = screen.getByRole("button",{name:"Save"})
    userEvent.click(saveButton)
    const errorMessage = await screen.findByText("Operation could not be performed.Please try again later.")
    // const errorIcon = screen.findByTitle("error-icon")
    expect(errorMessage).toBeInTheDocument()
    // expect(errorIcon).toBeInTheDocument()
})



// test('on clicking Save button and after successful response redirects to user profile page',()=>{
//     const store = createStore(combined)
//     render(<Provider store={store}><Router history={history}><EditProfile></EditProfile></Router></Provider>)
//     const saveButton = screen.getByRole("button",{name:"Save"})
//     userEvent.click(saveButton)
//     expect(window.location.pathname).toBe("/user/dXNlckBnbWFpbC5jb20=/profile")
// })