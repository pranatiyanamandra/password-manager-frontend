import React, { useEffect } from "react";
import {getRecords } from "../../api/api";
import { connect } from "react-redux";
import history from "../../history/history";
import "./displayRecords.css";
import { setRecordsActionCreator } from "../../../actions";
import { useState } from "react";
const DisplayRecords = (props) => {
    const [records,setRecords] = useState([])
    const [err,setErr]=useState(false)
    useEffect(() => {
        const response = getRecords(window.btoa(props.email))
        response.then((res) => {
            setRecords(res.data)

        }).catch((err)=>{
            setErr(true)
        })
    }, [])

    const renderNotPerformed=()=>{
        return <h5 style={{ color: "red" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>Unable to fetch data.Please try again later.</h5>
    }

    const renderDataWithinRecord = (record) => {
        var elements = []
        for (var key in record) {
            if (record.hasOwnProperty(key)) {
                elements.push(<>
                    <label for="exampleInputEmail1">{key}</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={key} value={record[key]} ></input>
                </>)
            }
        }
        return elements;
    }

    const onEditClick = (index) => {
        history.push(window.location.pathname + "/" + index)
    }

    const onDeleteClick = (index) => {
        history.push(window.location.pathname + "/" + index+"/delete")
    }



    const renderRecords = () => {
        if (typeof records === "object") {
            return records.map((record, index) => {
                return <div class="form-group raised-segment" >
                    <h6 className="display-5">{record['Title']} Record
                        <span className="edit-icon" onClick={() => {
                            onEditClick(index)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>

                        </span>
                        <span className="edit-icon" onClick={()=>{onDeleteClick(index)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>

                        </span>

                    </h6>
                    {renderDataWithinRecord(record)}
                    <hr class="my-4"></hr>
                </div>
            })
        }
    }

    const onAddClick = () => {
        history.push(window.location.pathname + "/create")
    }

    return <div class="jumbotron" style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%", backgroundColor: "#003b49", color: "white", overflow: "auto" }}>
        <h4 className="display-5">Secret Records
            <span className="edit-icon" onClick={onAddClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />
                </svg>
            </span>
        </h4>
        <hr class="my-4"></hr>
        {err?renderNotPerformed():renderRecords()}
    </div>
}

const mapStateToProps = (state) => {
    return {
        email: state.email,
    }
}

const mapDispatchToProps =  {
    setRecords: setRecordsActionCreator
}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayRecords);