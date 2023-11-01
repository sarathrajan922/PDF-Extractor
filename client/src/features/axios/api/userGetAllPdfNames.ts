import { AxiosRequestConfig } from "axios";
import BASE_URL,{urls} from "../../../config";
import userSetupAxiosInterceptor from "../interceptors/userAxiosInterceptor";

const api = userSetupAxiosInterceptor();

export const userGetAllCreatedPdfsNames = async ()=>{
    try{
        const config : AxiosRequestConfig = {
            url : BASE_URL+urls.USER_GET_ALL_PDF_NAMES,
            method : 'get'
        }

        const response = await api(config);
        return response.data
    }catch(err : any){
        if(err.message === 'Request failed with status code 404'){
            throw new Error('Api not found!')
        }else{
            throw new Error('something went wrong! Try Again!!')
        }
    }
}
