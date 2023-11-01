import UsersInterface from "../interfaces/user.interface";
import { createToken } from "../utils/token";
import HttpExceptions from "../utils/exceptions/http.exceptions";
import smtpService from "../common/nodeMailer";
import MailSender from "../interfaces/mailSender.interface";
import Sms from "../interfaces/smsSender.interface";
// import smsSender from "../common/smsSender";
import prisma from "../utils/database/prismaclient";
import compare from "../common/bcryptCompare";

class UsersService {
  private _userModel = prisma.users;

  public registerByEmail = async (data: UsersInterface) => {
    try {
      const users = await this._userModel.findFirst({
        where: { email: data.email! },
      });
      if (users) {
        throw new HttpExceptions(409, "Email already exists");
      }

      const createdUser = await this._userModel.create({ data });
      const mailOptions: MailSender = {
        to: createdUser.email as string,
        subject: "Your Verification Code",
        text: `Your TripTick Verification Code Is : ${data.verification_code}`,
      };
      await smtpService(mailOptions);
      const token = createToken(createdUser);
      return token;
    } catch (error: unknown) {
      throw error; // Re-throw the caught HttpExceptions instance
    }
  };

  public registerByPhoneNumber = async (data: UsersInterface) => {
    try {
      const users = await this._userModel.findUnique({
        where: {
          phone_number: data.phone_number!,
        },
      });
      if (users) {
        throw new HttpExceptions(409, "Phone Number already exists");
      }
      const createdUser = await this._userModel.create({ data });
      const smsOptions: Sms = {
        from: "+13012462816",
        to: data.phone_number!,
        body: `Your TripTick Verification Code is : ${data.verification_code}`,
      };
      // await smsSender(smsOptions);
      const token = createToken(createdUser);
      return token;
    } catch (error: any) {
      throw error; // Re-throw the caught HttpExceptions instance
    }
  };

  public confirmEmail = async (verification_code: string, email: string) => {
    try {
      const verification = await this._userModel.findUnique({
        where: { email: email, verification_code },
      });

      if (verification) {
        const verificationExpireTimeStr = verification.verification_expire_time;
        const verificationExpireTime = new Date(verificationExpireTimeStr!);
        const currentTime = new Date();
        if (currentTime < verificationExpireTime) {
          await this._userModel.update({
            where: {
              email,
            },
            data: {
              verified_status: true,
            },
          });
          return { Success: true };
        } else {
          return { Success: false, error: "Verification Code Expired" };
        }
      } else {
        return { Success: false, error: "Invalid Verification Code" };
      }
    } catch (error: any) {
      throw error;
    }
  };

  public getUserByEmail = async (
    email: any
  ): Promise<UsersInterface | null> => {
    try {
      const user = await this._userModel.findUnique({ where: { email:email! } });
      return user;
    } catch (err: any) {
      console.log(err)
      throw new Error("Internal Server Error");
    }
  };

  public resendEmailVerification = async (
    email: string,
    verification_code: string,
    verification_expire_time: Date
  ): Promise<string | void> => {
    try {
      const user = await this._userModel.update({
        where: {
          email,
        },
        data: {
          verification_code,
          verification_expire_time,
        },
      });
      const mailOptions: MailSender = {
        to: email,
        subject: "Your Verification Code",
        text: `Your TripTick Verification Code Is : ${verification_code}`,
      };
      await smtpService(mailOptions);
      return;
    } catch (err: any) {
      throw new Error("Internal Server Error");
    }
  };

  public getAllUsers = async (): Promise<UsersInterface[]> => {
    try {
      const users = await this._userModel.findMany();
      return users;
    } catch (err: unknown) {
      throw new Error("Internal Server Error");
    }
  };

  public login = async (data: UsersInterface): Promise<string | undefined> => {
    try {
      const user: UsersInterface | null = data.email
        ? await this._userModel.findUnique({
            where: { email: data.email },
          })
        : await this._userModel.findUnique({
            where: { phone_number: data.phone_number! },
          });

      if (!user) {
        throw new HttpExceptions(
          409,
          "email or password is wrong, please check the credentials"
        );
      }

      const comparePassword = await compare(data.password!,user.password!)


      if (comparePassword) {
        const token = createToken(user);
        return token;
      } else {
        throw new HttpExceptions(
          401,
          "email or password is wrong, please check the credentials"
        ); // Change the HTTP status code to 401 for unauthorized access
      }
    } catch (err: any) {
      throw new HttpExceptions(
        err.status,
        err.message || "internal server error"
      ); // Handle other errors as Internal Server Errors
    }
  };

  public googleAuthRegister = async(data:any)=>{
    try {
      // console.log(data)
      const user = await this._userModel.findFirst({where:{email:data.email}});
      let token;
      if (user){
        token = createToken(user);
      }else{
        const newUser = await this._userModel.create({
          data
        });
        token = createToken (newUser)
      }
      return token;
    } catch (error: unknown) {
      console.log(error)
      throw error; // Re-throw the caught HttpExceptions instance
    }
  }
  
  public editUserInfo = async(data:UsersInterface)=>{
    try{
      const user = await this._userModel.findUnique({where:{email:data.email!}})
      if (user){
        return await this._userModel.update({where:{email:data.email as string},data:{
          first_name:data.first_name,
          last_name:data.last_name,
          phone_number:data.phone_number,
          middle_name:data.middle_name,
          country:data.country,
          country_tag:data.country_tag
        }})
      }else{
        throw new HttpExceptions(404, "User Not Found");
      }
    }catch(err:any){
      throw err
    }
  }
}

export default UsersService;
