import bcrypt from "bcrypt"

const compare = (data_password:string,user_password:string) =>
new Promise<boolean>((resolve, reject) => {
  bcrypt.compare(data_password, user_password, (err, result) => {
    if (err) {
      console.log("err");
      reject(err);
    } else {
      resolve(result);
    }
  });
});

export default compare