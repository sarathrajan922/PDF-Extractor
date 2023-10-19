import axios, { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../config";

export const registerUser = async (values: any) => {
  //todo replace any with corresponding formdata type
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.USER_REGISTER,
      method: "POST",
      data: values,
    };

    const response = await axios(config);
    return response?.data;
  } catch (err: any) {
    if (err.message === "Request failed with status code 404") {
      throw new Error("Api not available!!");
    } else {
      throw new Error("something went wrong!!,Try again!");
    }
  }
};
