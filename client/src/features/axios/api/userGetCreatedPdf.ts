import { AxiosRequestConfig } from "axios";
import BASE_URL,{urls} from "../../../config";
import userSetupAxiosInterceptor from "../interceptors/userAxiosInterceptor";
const api = userSetupAxiosInterceptor();


export const userGetCreatedPdf = async (pdfId : string)=>{
    try{
        const config : AxiosRequestConfig = {
            url : BASE_URL + urls.USER_GET_CREATED_PDF + pdfId,
            method : 'get'
        }

        const response = await api(config);
        return response.data.data
    }catch(err:any){
        if(err.message === 'Request failed with status code 404'){
            throw new Error('Api not Found!')
        }else{
            throw new Error("Something went wrong!! Try Again!!")
        }
    }
}
