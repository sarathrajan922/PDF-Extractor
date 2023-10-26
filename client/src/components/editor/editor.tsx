import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import usePdfPages from "../../features/customHooks/usePdfPages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { getPDF } from "../../features/axios/api/userGetPdf";
import { newPdf } from "../../features/axios/api/userGetNewPdf";
import { notify } from "../common/toast";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Editor: React.FC = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState<boolean>(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Array<string>>(
    []
  );
  const [numPages, setNumPages] = useState<number | null>(null);
  const navigate = useNavigate();
  const [err, setErr] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<any>(null);
  useEffect(() => {
    if (id) {
      getPDF(id)
        .then((response) => {
          // Convert the binary data to Blob or Uint8Array, create a URL
          const binaryData = response.data.data; //  binary data
          const uint8Array = new Uint8Array(binaryData);
          const blob = new Blob([uint8Array], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(blob);
          setPdfUrl(pdfUrl);
        })
        .catch((error) => console.log(error.message));
        
    }
  }, [id]);

  useEffect(()=>{
    renderPDF()
  },[pdfUrl])



  //handleCheckboxChange function handles the checkbox changes
  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCheckboxes((prev) => [...prev, value]);
    } else {
      setSelectedCheckboxes((prev) => prev.filter((item) => item !== value));
    }
  };

  const renderPDF = ()=>{
    if(pdfUrl){
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
  
                loadingTask.promise
                .then((pdf: any) => { // Use appropriate types for pdf
                  const container = document.getElementById("pdf-container");
  
                  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    pdf.getPage(pageNum).then((page: any) => { // Use appropriate types for page
                      const scale = window.innerWidth > 768 ? 1 : 0.7; // You can adjust the scale as needed
                      const viewport = page.getViewport({ scale });
                      const canvas = document.createElement("canvas");
                      const context = canvas.getContext("2d");
                      canvas.height = viewport.height;
                      canvas.width = viewport.width;
                      if (container) {
                        container.appendChild(canvas);
                        page.render({
                          canvasContext: context as any, // Use appropriate types for canvasContext
                          viewport: viewport,
                        });
                      }
                    });
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
         
              }
  }

  



  //handleExtract function calls the API for creating a new PDF
  const handleExtract = () => {
    // Do further processing with the selected checkboxes
    if (id && selectedCheckboxes.length) {
      setLoader(true);
      newPdf(selectedCheckboxes, id)
        .then((response) => {
          console.log(response.data)
          notify('success','PDF Extracted successfully')
          setLoader(false);
          const pdfDataUrl = convertBufferToPdfUrl(response.data.data);
          setPdfUrl(pdfDataUrl);
        })
        .catch((error) => {
          notify("err", error.message);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 6000);
    }
  };

  //usePdfPages Hook return the number of pages inside the pdf
  const pages = usePdfPages(pdfUrl);
  useEffect(() => {
    setSelectedCheckboxes([]);
    setNumPages(pages);
  }, [pages, pdfUrl]);

  //this function convertBuffer Data of a pdf into pdfUrl string
  const convertBufferToPdfUrl = (buffer: number[]): string => {
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const chooseAnother = () => {
    navigate("/upload");
  };

  //handleDownloads the pdf download request
  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "give_me_a_name.pdf";
      link.click();
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen">
      {!loader && (
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">PDF Viewer</h1>
          <div className="rounded-md p-4 h-[35rem] shadow-2xl overflow-y-auto">
            <div>
              {pdfUrl ? (
                // <iframe
                //   src={pdfUrl}
                //   width="100%"
                //   height="500px"
                //   title="PDF Viewer"
                // />
                <div id="pdf-container" ></div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <div className="spinner"></div>
                  <div>Loading...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {loader && (
        <div>
          <div className="spinner ms-3 mb-3"></div>
          <div className="m">Please wait...</div>
        </div>
      )}
      <ToastContainer />
      {/* Right Section */}
      {!loader && (
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Editor</h1>
          <div className="rounded-md p-4 flex justify-center  h-full">
            <div>
              {pdfUrl ? (
                <>
                  <p className="text-center">Extract PDF</p>
                  <p className="text-center mb-5 text-green-600 text-bold text-xl">
                    Available Pages: {numPages}
                  </p>

                  <div className="checkbox-container flex flex-wrap gap-4 my-7">
                    {numPages !== null &&
                      Array.from({ length: numPages }, (_, index) => (
                        <div
                          key={index}
                          className="checkbox-item mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]"
                        >
                          <input
                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="checkbox"
                            id={`inlineCheckbox${index + 1}`}
                            value={index + 1}
                            checked={selectedCheckboxes.includes(
                              `${index + 1}`
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                `${index + 1}`,
                                e.target.checked
                              )
                            }
                          />

                          <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor={`inlineCheckbox${index + 1}`}
                          >
                            {index + 1}
                          </label>
                        </div>
                      ))}
                  </div>

                  <div className="flex flex-col  justify-center my-10">
                    <button
                      type="button"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      onClick={handleExtract}
                    >
                      Extract
                    </button>
                    <button
                      type="button"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      onClick={chooseAnother}
                    >
                      Choose Another
                    </button>

                    <button
                      onClick={handleDownload}
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Download
                    </button>

                    {err && (
                      <div className="text-center text-red-600">
                        Please Select Atleast One Page!
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="spinner"></div>
                  <div className="text-center">Loading...</div>
                </>
              )}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Editor;
