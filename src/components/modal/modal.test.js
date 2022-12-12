import { render ,screen} from "@testing-library/react"
import history from "../history/history";
import Modal from "./modal";

const closeLoginModal=()=>{
    history.push("/")
}
test('renders Modal with content provided as props',()=>{
    const modalContent = <div>Modal Content</div>
    render(<Modal modalContent={modalContent} onDismiss={closeLoginModal}></Modal>)
    const modalText = screen.getByText("Modal Content")
    expect(modalText).toBeInTheDocument()
})

// test('closes the Modal when the escape character is pressed on the keyboard',()=>{
//     const modalContent = <div>Modal Content</div>
//     render(<div data-testId = "outer-div" ><Modal data-testId="modal"  modalContent={modalContent} onDismiss={closeLoginModal}></Modal></div>)
//     const container = screen.getByTestId("outer-div") 
//     const modalText = screen.getByText("Modal Content")
//     userEvent.click(container)
//     expect(modalText).not.toBeInTheDocument()
// })