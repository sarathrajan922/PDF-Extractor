import React,{useState} from 'react';
import { uploadPDF } from '../../features/axios/api/userUploadPDF';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../common/toast";

const Upload: React.FC = () => {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
          // Validate the file type (e.g., PDF) and size (MAX. 800x400px)
          if (!validateFile(file)) {
            setErrorMessage('Invalid file. Please select a PDF file.');
            setSelectedFile(null);
          } else {
            setErrorMessage(null);
            setSelectedFile(file);


            // Create a FormData object to send the file to your API
      const formData = new FormData();
      formData.append('pdf', file);

       uploadPDF(formData).then((response)=>{
        console.log(response)
        notify("success", "your PDF uploaded!");
        setTimeout(()=>{
            navigate('/editor')
        },1500);
        
       }).catch(error => console.log(error.message))
          }
        } else {
          setSelectedFile(null);
        }
      }

      function validateFile(file: File): boolean {
        return file.type === 'application/pdf';
      }






  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
          UPLOAD YOUR PDF HERE
        </h2>
      </div>

      <div className="mt-10 lg:w-[40rem] sm:mx-auto sm:w-full  ">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-950 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-amber-100 hover:bg-amber-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-yellow-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF only 
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange}/>
          </label>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {selectedFile && (
        <p className="text-green-500">Selected File: {selectedFile.name}</p>
      )}
      <ToastContainer />
        </div>
      </div>
     </div>
  );
};

export default Upload;