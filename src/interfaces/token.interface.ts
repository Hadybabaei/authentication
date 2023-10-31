export default interface Token {
    user:{
      email:string,
    },
    email: string; 
    expiresIn: number;
  }