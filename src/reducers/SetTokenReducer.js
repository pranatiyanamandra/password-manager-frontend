const setTokenReducer=(state="",action)=>{
    if(action.type==="SET_TOKEN"){
        return action.payload.token;
    }
    else{
        return state;
    }
}
export default setTokenReducer;