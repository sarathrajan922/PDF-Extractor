import { AxiosRequestConfig } from "axios";
import userSetupAxiosInterceptor from "../interceptors/userAxiosInterceptor";
import BASE_URL, { urls } from "../../../config";

const api = userSetupAxiosInterceptor();

export const getPDF = async (pdfId:string) => {
    //todo change the pdfId into dynamic
//   const pdfId = "65342100114e0f8b9e9eab2c";
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.USER_GET_PDF + pdfId,
      method: "get",
    };

    const response = await api(config);
    return response.data;
  } catch (err: any) {
    if (err.message === "Request failed with status code 404") {
      throw new Error("Api not available!!");
    } else {
      throw new Error("something went wrong!!,Try again!");
    }
  }
};
