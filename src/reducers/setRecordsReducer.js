const setRecordsReducer=(state=[],action)=>{
    if(action.type==="SET_RECORDS"){
        return action.payload.records;
    }
    else{
        return state;
    }

}
export default setRecordsReducer;