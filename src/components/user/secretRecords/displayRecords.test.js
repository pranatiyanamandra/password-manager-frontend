import { render ,screen} from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event"
import { rest } from "msw";
import {server} from "../../../mocks/server";
import history from "../../history/history";
import DisplayRecords from "./displayRecords";
import {setRecordsActionCreator} from "../../api/api";
import reducers from "../../../reducers";

test('renders Secret Records Heading ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><DisplayRecords></DisplayRecords></Router></Provider>)
    const secretRecordsHeading = screen.getByText("Secret Records")
    expect(secretRecordsHeading).toBeInTheDocument();
})

test('renders Secret Record title ',async()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><DisplayRecords></DisplayRecords></Router></Provider>)
    const titleHeading = await screen.findAllByText("title")
    expect(titleHeading).toHaveLength(2);
})


test('renders Unable to fetch data when error response is returned',async()=>{
    server.resetHandlers(
        rest.get('http://localhost:8080/users//passwords',(req,res,ctx)=>{
            return res(ctx.status(500))
        })
    )
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><DisplayRecords></DisplayRecords></Router></Provider>)
    const errorMessage = await screen.findByText("Unable to fetch data.Please try again later.")
    expect(errorMessage).toBeInTheDocument();
})

