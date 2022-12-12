import axios from "axios";

const trello = axios.create({baseURL:"http://localhost:8080"});

export const login=async (body)=>{
    const response = await trello.post("/users/login",body,{
        
        'Access-Control-Allow-Origin' : '*',
        'credentials': 'include',
        'Content-type': 'application/json; charset=UTF-8',
});
    return response;
}

export const register=async (body)=>{
    const headers = {
        
        'Access-Control-Allow-Origin' : '*',
        'credentials': 'include',
        'Content-type': 'application/json; charset=UTF-8',
}
    const response = await trello.post("/users/register",body,{headers});
    return response;
} 

export const check=async (body)=>{
    const response = await trello.post("/check",body,{
            'Access-Control-Allow-Origin' : '*',
            'credentials': 'include',
            'Content-type': 'application/json; charset=UTF-8'
    });
    return response;
}

export const logout=async ()=>{
    const headers = {
        'Authorization':'Bearer '+sessionStorage.getItem("trello_token"),
        'Access-Control-Allow-Origin' : '*',
        'credentials': 'include',
        'Content-type': 'application/json; charset=UTF-8'
    }

    const response = await trello.post("/users/logout",{},{headers});
    return response;
}

export const getProfile=async (email)=>{
    const headers = {
        'Authorization':'Bearer '+sessionStorage.getItem("trello_token"),
        'Access-Control-Allow-Origin' : '*',
        'credentials': 'include',
        'Content-type': 'application/json; charset=UTF-8'
    }

    const response = await trello.get("/users/"+email+"/data",{headers});
    return response;
}

export const editProfile=async (email,body)=>{
    const headers = {
        'Authorization':'Bearer '+sessionStorage.getItem("trello_token"),
        'Access-Control-Allow-Origin' : '*',
        'credentials': 'include',
        'Content-type': 'application/json; charset=UTF-8'
    }
    console.log("body in the api edit progile ",body)
    const response = await trello.put("/users/"+email+"/data",body,{headers});
    return response;
}

export const getRecords=async (email)=>{
    const headers = {
        'Authorization':'Bearer '+sessionStorage.getItem("trello_token"),
        'Access-Control-Allow-Origin' : '*',
        'credentials': 'include',
        'Content-type': 'application/json; charset=UTF-8'
    }

    const response = await trello.get("/users/"+email+"/passwords",{headers});
    return response;
}

export const addRecord=async (email,body)=>{
    const headers = {
        'Authorization':'Bearer '+sessionStorage.getItem("trello_token"),
        'Access-Control-Allow-Origin' : '*',
        'credentials': 'include',
        'Content-type': 'application/json; charset=UTF-8'
    }

    const response = await trello.post("/users/"+email+"/passwords",body,{headers});
    return response;
}

export const editRecords=async (email,body)=>{
    const headers = {
        'Authorization':'Bearer '+sessionStorage.getItem("trello_token"),
        'Access-Control-Allow-Origin' : '*',
        'credentials': 'include',
        'Content-type': 'application/json; charset=UTF-8'
    }

    const response = await trello.put("/users/"+email+"/passwords",body,{headers});
    return response;
}

export const deleteRecord=async (email,index)=>{
    const headers = {
        'Authorization':'Bearer '+sessionStorage.getItem("trello_token"),
        'Access-Control-Allow-Origin' : '*',
        'credentials': 'include',
        'Content-type': 'application/json; charset=UTF-8'
    }
    console.log("heasers")
    console.log(headers)


    const response = await trello.delete("/users/"+email+"/passwords/"+index,{headers},{});
    return response;
}