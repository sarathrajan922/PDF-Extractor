import { AxiosRequestConfig } from "axios";
import userSetupAxiosInterceptor from "../interceptors/userAxiosInterceptor";
import BASE_URL,{urls} from "../../../config";


const api = userSetupAxiosInterceptor();

export const newPdf = async(page:string[],pdfId:string)=>{
    //todo make pages dynamic
    const pages = page.join(',')
    // const pdfId = 'djfkjd'
    try{
        const config:AxiosRequestConfig ={
            url: BASE_URL+urls.USER_GET_NEW_PDF+pdfId,
            method: 'get',
            params: {
                pages: pages, // Add your desired page numbers here
              },
        }
        const response = await api(config);
        return response.data
    }catch(err:any){
        if (err.message === "Request failed with status code 404") {
            throw new Error("Api not available!!");
          } else {
            throw new Error("something went wrong!!,Try again!");
          }
    }
}