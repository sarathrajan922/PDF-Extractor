import { AxiosRequestConfig } from 'axios';
import userSetupAxiosInterceptor from '../interceptors/userAxiosInterceptor';
import BASE_URL,{urls} from '../../../config';

const api = userSetupAxiosInterceptor();

export const uploadPDF = async(file:any)=>{
    try{
        const config:AxiosRequestConfig = {
            url: BASE_URL+urls.USER_UPLOAD_PDF,
            method:'post',
            data: file
        };

        const response = await api(config);
        return response.data;

    }catch(err:any){
        if(err.message === "Request failed with status code 404") {
            throw new Error("Api not available!!");
          } else {
            throw new Error("something went wrong!!,PDF oversized!");
          }
    };
}