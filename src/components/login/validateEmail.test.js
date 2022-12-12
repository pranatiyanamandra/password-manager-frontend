import { render ,screen} from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import ValidateEmail from "./validateEmail"
import reducers from "../../reducers";
import { Router } from "react-router-dom";
import history from "../history/history";
import userEvent from "@testing-library/user-event"
import {server} from "../../mocks/server";
import { rest } from "msw";

test('renders Login Modal with Key Svg ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidateEmail/></Router></Provider>)
    const keySvg = screen.getByTitle("avatar")
    expect(keySvg).toBeInTheDocument();
})

test('renders Email Address label for email input',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidateEmail/></Router></Provider>)
    const emailText = screen.getByText("Email Address")
    expect(emailText).toBeInTheDocument();
})

test('renders Next button in Login modal',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidateEmail/></Router></Provider>)
    const nextButton = screen.getByRole("button",{name:"Next"})
    expect(nextButton).toBeInTheDocument();
})

test('Next button is disabled in Login modal',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidateEmail/></Router></Provider>)
    const nextButton = screen.getByRole("button",{name:"Next"})
    expect(nextButton).toBeDisabled();
})

test('renders Account not found when Response from backend is an error',async ()=>{
    server.resetHandlers(
        rest.post('http://localhost:8080/check',(req,res,ctx)=>{
            return res(
                ctx.json(
                    {
                        "message":"User Not Found"
                    }
                )
            ) 
        })
    )
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidateEmail/></Router></Provider>)
    const emailInput = screen.getByPlaceholderText("Enter Email Address")
    userEvent.type(emailInput,"user@gmail.com")
    const nextButton = screen.getByRole("button",{name:"Next"})
    userEvent.click(nextButton);
    const notFound = await screen.findByText("Account Not Found")
    expect(notFound).toBeInTheDocument()
})

test('enables Next button when email address field in Login Modal are filled',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><ValidateEmail/></Router></Provider>)
    const nextButton = screen.getByRole("button",{name:"Next"})
    const emailAddressField = screen.getByPlaceholderText("Enter Email Address")
    userEvent.type(emailAddressField,"user@gmail.com")
    expect(nextButton).toBeEnabled();
})

// test('redirects to next stage of Login url when Next button is clicked in Login modal',()=>{
//     const store = createStore(reducers)
//     render(<Provider store={store}><Router history={history}><ValidateEmail/></Router></Provider>)
//     const nextButton = screen.getByRole("button",{name:"Next"})
//     const emailInput = screen.getByPlaceholderText("Enter Email Address")
//     userEvent.type(emailInput,"user@gmail.com")
//     userEvent.click(nextButton);
//     expect(history.location.pathname).toBe("/login/dXNlckBnbWFpbC5jb20=")
// })

