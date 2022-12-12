import { render ,screen} from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducers from "../../../reducers";
import { Router } from "react-router-dom";
import history from "../../history/history";
import Profile from './profile';

function combined(state = {}, action) {
    return {
     email:"user@gmail.com"
    }
}

test('renders User Profile Heading ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Profile/></Router></Provider>)
    const userProfileHeading = screen.getByText("User Profile")
    expect(userProfileHeading).toBeInTheDocument();
})


test('renders First Name Heading ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Profile/></Router></Provider>)
    const firstNameHeading = screen.getByText("First Name")
    expect(firstNameHeading).toBeInTheDocument();
})

test('renders Last Name Heading ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Profile/></Router></Provider>)
    const lastNameHeading = screen.getByText("Last Name")
    expect(lastNameHeading).toBeInTheDocument();
})

test('renders Email Address Heading ',()=>{
    const store = createStore(reducers)
    render(<Provider store={store}><Router history={history}><Profile/></Router></Provider>)
    const emailAddressHeading = screen.getByText("Email Address")
    expect(emailAddressHeading).toBeInTheDocument();
})

test('renders Edit icon ',()=>{
    const store = createStore(reducers)
    const { container } = render(<Provider store={store}><Router history={history}><Profile/></Router></Provider>)
    const editIcon  = container.querySelector("[class='bi bi-pencil-square']");
    expect(editIcon).toBeInTheDocument();
})

