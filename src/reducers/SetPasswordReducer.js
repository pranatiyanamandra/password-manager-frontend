const setPasswordReducer=(state="",action)=>{
    if(action.type==="SET_PASSWORD"){
        return action.payload.password;
    }
    else{
        return state;
    }
}
export default setPasswordReducer;