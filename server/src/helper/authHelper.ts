/**
 * @description authHelper 
 * This module defines some functions that deal with the database.
 * 
 * @imports
 * import jwtAuthentication for generate token
 * import UserModel 
 * import UserDataInterface 
 * 
 * @instance
 * create an instance of the jwtAuthentication (jwtTokens)
 * 
 * @exports
 * Export the authHelper
 */




import jwtAuthentication from "../middleware/jwt";
import UserModel from "../database/model/userModel";
import { UserDataInterface } from "../types/userData";

const jwtTokens = jwtAuthentication();

const authHelper = () => {
  //getUserByEmail this function check the user is Exist or not
  const getUserByEmail = async (email: string) => {
    const data = await UserModel.find({ email });
    return data;
  };

  //userRegister this function takes the formData and check user is exist or
  // not.If user exist then create token else create user and return token
  const userRegister = async (userData: UserDataInterface) => {
    const userExist = await getUserByEmail(userData.email);
    let id;
    //check user exists already
    if (userExist.length) {
      id = userExist[0]._id.toString();
    } else {
      const data = await UserModel.create(userData);
      id = data._id.toString();
    }

    //create payload object for token
    const payload = {
      email: userData.email,
      role: "user",
      id,
    };
    //call function for create token
    const token = jwtTokens.generateToken(payload);
    return token;
  };

  return {
    userRegister,
  };
};

export default authHelper;
