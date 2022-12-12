import { render,screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Home from "./home"

test('renders Store and Retrieve your passwords all in one place.',()=>{
    render(<Home></Home>,{wrapper:BrowserRouter})
    const element = screen.getByText("Store and Retrieve your passwords all in one place.")
    expect(element).toBeInTheDocument()
})

test('renders It uses several security measures to ensure that your passwords are protected and not misused.',()=>{
    render(<Home></Home>,{wrapper:BrowserRouter})
    const element = screen.getByText("It uses several security measures to ensure that your passwords are protected and not misused.")
    expect(element).toBeInTheDocument()
})
