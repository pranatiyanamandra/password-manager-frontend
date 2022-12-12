import { render ,screen, waitFor} from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event"
import { rest } from "msw";
import history from "../../../history/history";
import {server} from "../../../../mocks/server";
import DeleteRecord from "./deleteRecord";

function combined(state = {}, action) {
    return {
     email:"",
     records:[
        {
            "title":"record title 0",
            "email":"record email 0",
            "password":"record password 0"
        },
        {
            "title":"record title 1",
            "email":"record email 1",
            "password":"record password 1"
        }
     ],
     index:0
    }
}

test('renders Are you sure you want to Delete this record? Heading ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><DeleteRecord></DeleteRecord></Router></Provider>)
    const deleteRecordHeading = screen.getByText("Are you sure you want to Delete this record?")
    expect(deleteRecordHeading).toBeInTheDocument();
})

test('renders No button ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><DeleteRecord></DeleteRecord></Router></Provider>)
    const noButton = screen.getByRole("button",{name:"No"})
    expect(noButton).toBeInTheDocument();
})

test('renders Yes button ',()=>{
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><DeleteRecord></DeleteRecord></Router></Provider>)
    const yesButton = screen.getByRole("button",{name:"Yes"})
    expect(yesButton).toBeInTheDocument();
})
// test('closes modal when the yes button is clicked and record is successfully deleted',async()=>{
//     const store = createStore(combined)
//     render(<Provider store={store}><Router history={history}><DeleteRecord></DeleteRecord></Router></Provider>)
//     const deletionMessage = screen.getByText("Are you sure you want to Delete this record?")
//     const yesButton = screen.getByRole("button",{name:"Yes"})
//     userEvent.click(yesButton)
//     expect(deletionMessage).not.toBeInTheDocument()
// })
test('renders Operation not performed when error response is returned',async()=>{
    server.resetHandlers(
        rest.put('http://localhost:8080/users//passwords',(req,res,ctx)=>{
            return res(ctx.status(500))
        })
    )
    const store = createStore(combined)
    render(<Provider store={store}><Router history={history}><DeleteRecord></DeleteRecord></Router></Provider>)
    const yesButton = screen.getByRole("button",{name:"Yes"})
    userEvent.click(yesButton)
    const errorMessage = await screen.findByText("Operation could not be performed.Please try again later.")
    expect(errorMessage).toBeInTheDocument();
})

