const setEmailReducer=(state="",action)=>{
    if(action.type==="SET_EMAIL"){
        return action.payload.email;
    }
    else{
        return state;
    }

}
export default setEmailReducer;