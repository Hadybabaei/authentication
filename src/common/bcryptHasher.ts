import bcrypt from "bcrypt"
const hashMaker = async (password:string):Promise<string> =>{
    const saltRounds = 10;
    const newPassword = bcrypt.hash(password,saltRounds)
    return newPassword
}

export default hashMaker;