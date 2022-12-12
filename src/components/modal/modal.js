import React,{useEffect} from "react";
import "./modal.css"
const Modal = (props) => {

    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            props.onDismiss()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])

    return <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div className="modal-content animate" onClick={(e)=>{e.stopPropagation()}}>
                {props.modalContent}
            </div>
        </div>
}
export default Modal;

