import {toast } from "react-toastify";


export const notify = (type:string,message:any)=>{
    if (type === "err") {
        toast.error(`${message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast(message);
      }
}