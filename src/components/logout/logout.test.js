import { render ,screen} from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducers from "../../reducers";
import { Router } from "react-router-dom";
import history from "../history/history";
import Logout from "./logout";

test('renders Logout Modal with Key Svg ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Logout></Logout></Router></Provider>)
    const keySvg = screen.getByTitle("avatar")
    expect(keySvg).toBeInTheDocument();
})

test('renders Are you sure you want to Logout in Logout Modal ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Logout></Logout></Router></Provider>)
    const text  = screen.getByText("Are you sure you want to Logout?")
    expect(text).toBeInTheDocument();
})

test('renders yes button in Logout Modal ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Logout></Logout></Router></Provider>)
    const yesButton  = screen.getByRole("button",{name:"Yes"})
    expect(yesButton).toBeInTheDocument();
})

test('renders no button in Logout Modal ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Logout></Logout></Router></Provider>)
    const noButton  = screen.getByRole("button",{name:"No"})
    expect(noButton).toBeInTheDocument();
})

// test('renders login unsuccessful when response from backend has 500 status in Logout Modal ',()=>{
//     server.resetHandlers(
//         rest.post('http://localhost:8080/users/logout',(req,res,ctx)=>{
//             res(ctx.status(500)); 
//         })
//     )
    
//     const store = createStore(reducers)
//     render(<Provider store={store}><Router history={history}><Logout></Logout></Router></Provider>)
//     const yesButton  = screen.getByRole("button",{name:"Yes"})
//     userEvent.click(yesButton)
//     const logoutNotPossible = screen.getByText("Operation could not be performed.Please try again later.")
//     expect(logoutNotPossible).toBeInTheDocument()   
// })