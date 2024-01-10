//src/service/users.ts

import * as userModel from "../model/users";

import { SignupInfo, LoginInfo } from "../interface/userInterface";


export const signup = async (
    email:string, 
    password:string,
  ) => {
      const result: SignupInfo = {
          email: email,
          password: password,
        };
        
      const data = await userModel.signup(result);
      return data; 
  }
  
export const login = async (email:string, password:string) => {
    const result: LoginInfo = {
        email: email,
        password: password,
    };

    const data = await userModel.login(result);
    return data; 
};