import { rest } from "msw";

export const handlers = [
    rest.post('http://localhost:8080/check',(req,res,ctx)=>{
        return res(
            ctx.json(
                {
                    "message":"User Found"
                }
            )
        )
    }),
    rest.post('http://localhost:8080/users/login',(req,res,ctx)=>{
        return res(
            ctx.json(
                {
                    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSJ9.1QpFoE5HT_7JIJjJ3Sj_rZ5cLfewnyAgtPlrJvYW5pQ"
                }
            )
        )
    }),
    rest.post('http://localhost:8080/users/logout',(req,res,ctx)=>{
        return res(ctx.status(200));
    }),
    rest.post('http://localhost:8080/users/register',(req,res,ctx)=>{
        return res(
            ctx.json(
                {
                    "message":"Registered Sucessfully"
                }
            )
        )
    }),
    rest.put('http://localhost:8080/users//data',(req,res,ctx)=>{
        return res(
            ctx.json(
                {
                    "message":"Edit successful"
                }
            )
        )
    }),
    rest.get('http://localhost:8080/users//data',(req,res,ctx)=>{
        return res(
            ctx.json(
                {
                    "firstName":"user",
                    "lastName":"",
                    "emailAddress":""
                }
            )
        )
    }),
    rest.get("http://localhost:8080/users//passwords",(req,res,ctx)=>{
        return res(
            ctx.json(
                [
                    {
                        "title":"record title 0",
                        "email":"record email 0",
                        "password":"record password 0"
                    },
                    {
                        "title":"record title 1",
                        "email":"record email 1",
                        "password":"record password 1"
                    }
                ]
            )
        )
    }),
    rest.delete('http://localhost:8080/users//passwords',(req,res,ctx)=>{
        return res(
            ctx.json(
                {
                    "message":"Deletion successful"
                }
            )
        )
    })
]

