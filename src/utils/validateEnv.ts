import { cleanEnv,str,port } from "envalid";

function validateEnv():void{
    cleanEnv(process.env,{
        PORT:port({default:5001}),
        JWT_SECRET:str(),
        DATABASE_NAME:str(),
        DATABASE_USER:str({default:"root"}),
        DATABASE_PASSWORD:str(),
        NODE_ENV:str()
    })
}

export default validateEnv;