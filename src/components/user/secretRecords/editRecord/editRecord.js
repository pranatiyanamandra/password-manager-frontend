import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import history from "../../../history/history";
import { editRecords,getRecords } from "../../../api/api";

const EditRecord = (props) => {

    const [records,setRecords] = useState([])
    const [record, setRecord] = useState()
    const [err, setErr] = useState(false)

    useEffect(()=>{
        const response = getRecords(window.btoa(props.email))
        response.then((res) => {
            setRecords(res.data)
            setRecord(records[props.index])

        }).catch((err)=>{
            setErr(true)
        })
    },[])

    const renderNotPerformed = () => {
        return <h5 style={{ color: "red" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>Operation could not be performed.Please try again later.</h5>
    }

    const onSaveClick = () => {
       const temp = records;
       temp.splice(props.index,1);
       temp.push(record);
        const response = editRecords(window.btoa(props.email), temp)
        response.then((res)=>{
            history.push("/user/" + window.btoa(props.email) + "/secret-records")
        }).catch((err)=>{
            setErr(true)
        })
        
    }

    const onFieldChange=(event)=>{
        const key = event.target.getAttribute('id');
        record[key] = event.target.value
        setRecord({...record})

    }

    const renderRecord = () => {
        var elements = []
        for (var key in record) {
            if (record.hasOwnProperty(key)) {
                elements.push(<div class="form-group">
                    <label for={key}>{key}</label>
                    <input type="text" class="form-control" id={key} aria-describedby={key} placeholder={key} value={record[key]}
                        onChange={onFieldChange}
                        >
                        </input>
                </div>)
            }
        }
        return elements
    }

    return <div class="jumbotron" style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%", backgroundColor: "#003b49", color: "white", overflow: "auto" }}>
    <h4 className="display-5">Edit Record</h4>
    <hr class="my-4"></hr>
    {renderRecord()}
    <div className="form-group">
        <button className="btn btn-outline-light edit-icon"
            type="next"
            onClick={onSaveClick}

        >Save</button>

        {err ? renderNotPerformed() : null}
    </div>
</div>
}
const mapStateToProps = (state) => {
    const index = window.location.pathname.split("/").at(-1)
    return { email: state.email,index:index }
}



export default connect(mapStateToProps, null)(EditRecord);