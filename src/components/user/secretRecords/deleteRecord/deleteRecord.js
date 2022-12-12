import React,{useState} from "react";
import {connect} from "react-redux";
import {deleteRecord} from "../../../api/api"
import history from "../../../history/history";
import Modal from "../../../modal/modal";
const DeleteRecord = (props) => {

    const [err, setErr] = useState(false)

    const closeLoginModal = () => {
        history.push("/user/"+window.btoa(props.email)+"/secret-records")
    }

    const onYesClick = ()=>{
        console.log("clicked")
        const response = deleteRecord(window.btoa(props.email),props.index);
        response.then((res)=>{
            if(res.status === 200){
                closeLoginModal()
            }
        }).catch((err)=>{
            setErr(true)
        })
    }

    const renderNotPerformed=()=>{
        return <h5 style={{ color: "red" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>Operation could not be performed.Please try again later.</h5>
    }
    const renderModalContent = () => {
        return <>
            <div className="imgcontainer">
                <span className="close" data-testid="abc" title="Close" onClick={() => { closeLoginModal(); }}>&times;</span>
                <button title="avatar" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                </svg></button>
            </div>

            <div className="my-container">
                <h5 style={{ margin: "auto" }}><b>Are you sure you want to Delete this record? </b></h5>
                <div class="container" style={{marginTop:"5%"}}>
                    <div class="row">
                        <div class="col-sm">
                            <button className="btn btn-outline-light"
                                type="submit"
                                onClick={closeLoginModal}
                            >No</button>    </div>
                        <div class="col-sm">
                        </div>
                        <div class="col-sm">
                            <button className="btn btn-outline-light"
                                type="submit"
                                onClick={onYesClick}
                            >Yes</button>    </div>
                    </div>
                </div>
                {err?renderNotPerformed():null}

            </div>

            <div className="my-container" >
                {/* <span className="psw">Forgot <a href="#">password?</a></span> */}
            </div>
        </>
    }
    return <>
        <Modal modalContent={renderModalContent()} onDismiss={closeLoginModal}></Modal>
    </>
}

const mapStateToProps=(state)=>{
    const index = window.location.pathname.split("/").at(-2)
    return {
        email:state.email,
        index:index
    }
}

export default connect(mapStateToProps,null)(DeleteRecord);