export const setEmailActionCreator = (email)=>{
    return {
        type:"SET_EMAIL",
        payload:{
            email:email
        }
    }
}

export const setPasswordActionCreator = (password)=>{
    return {
        type:"SET_PASSWORD",
        payload:{
            password:password
        }
    }
}

export const setTokenActionCreator = (token)=>{
    return {
        type:"SET_TOKEN",
        payload:{
            token:token
        }
    }
}

export const setRecordsActionCreator = (records)=>{
    return {
        type:"SET_RECORDS",
        payload:{
            records:records
        }
    }
}

