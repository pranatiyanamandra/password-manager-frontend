import { render ,screen} from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event"
import { rest } from "msw";
import history from "../../../history/history";
import AddRecord from "./addRecord";
import {server} from "../../../../mocks/server";
function combined(state = {}, action) {
    return {
     email:""
    }
}

test('renders Create Secret Record Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><AddRecord></AddRecord></Router></Provider>)
    const createSecretRecordHeading = screen.getByText("Create Secret Record")
    expect(createSecretRecordHeading).toBeInTheDocument();
})

test('renders New Record Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><AddRecord></AddRecord></Router></Provider>)
    const newRecordHeading = screen.getByText("New Record")
    expect(newRecordHeading).toBeInTheDocument();
})

test('renders Email Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><AddRecord></AddRecord></Router></Provider>)
    const emailHeading = screen.getByText("Email")
    expect(emailHeading).toBeInTheDocument();
})

test('renders User Name Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><AddRecord></AddRecord></Router></Provider>)
    const userNameHeading = screen.getByText("User Name")
    expect(userNameHeading).toBeInTheDocument();
})

test('renders Password Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><AddRecord></AddRecord></Router></Provider>)
    const passwordHeading = screen.getByText("Password")
    expect(passwordHeading).toBeInTheDocument();
})

test('renders Add Additional Fields Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><AddRecord></AddRecord></Router></Provider>)
    const addAdditionalFieldsHeading = screen.getByText("Add Additional Fields")
    expect(addAdditionalFieldsHeading).toBeInTheDocument();
})

test('renders Operation not performed when error response is returned',async()=>{
    server.resetHandlers(
        rest.post('http://localhost:8080/users//passwords',(req,res,ctx)=>{
            return res(ctx.status(500))
        })
    )
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><AddRecord></AddRecord></Router></Provider>)
    const saveButton = screen.getByRole("button",{name:"Save"})
    const emailInput = screen.getByTestId("InputEmail")
    const userNameInput = screen.getByTestId("InputUserName")
    const passwordInput = screen.getByTestId("InputPassword")
    userEvent.type(emailInput,"user@gmail.com");
    userEvent.type(userNameInput,"user name");
    userEvent.type(passwordInput,"password");
    userEvent.click(saveButton)
    const errorMessage = await screen.findByText("Operation could not be performed.Please try again later.")
    expect(errorMessage).toBeInTheDocument();
})