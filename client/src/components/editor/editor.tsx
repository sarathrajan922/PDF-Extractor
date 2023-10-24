import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import usePdfPages from "../../features/customHooks/usePdfPages";

import { useParams, useNavigate } from "react-router-dom";
import { getPDF } from "../../features/axios/api/userGetPdf";
import { newPdf } from "../../features/axios/api/userGetNewPdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Editor: React.FC = () => {
  const { id } = useParams();

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Array<string>>(
    []
  );
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

  const [numPages, setNumPages] = useState<number | null>(null);

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCheckboxes((prev) => [...prev, value]);
    } else {
      setSelectedCheckboxes((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleExtract = () => {
    // Do further processing with the selected checkboxes
    if (id && selectedCheckboxes.length) {
      newPdf(selectedCheckboxes, id)
        .then((response) => {
          const pdfDataUrl = convertBufferToPdfUrl(response.data.data);
          setPdfUrl(pdfDataUrl);
        })
        .catch((error) => console.log(error.message));
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

  const convertBufferToPdfUrl = (buffer: number[]): string => {
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const chooseAnother = () => {
    navigate("/upload");
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "your_name.pdf"; // You can set the desired filename here
      link.click();
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">PDF Viewer</h1>
        <div className="rounded-md p-4 h-[35rem] shadow-2xl overflow-y-auto">
          <div>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                width="100%"
                height="500px"
                title="PDF Viewer"
              />
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div className="spinner"></div>
                <div>Loading...</div>
              </div>
            )} 
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Editor</h1>
        <div className="rounded-md p-4 flex justify-center shadow-2xl h-[35rem]">
          <div>
            {pdfUrl ? (
              <>
                <p className="text-center">Extract PDF</p>
                <p className="text-center my-5 text-green-600 text-2xl">
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
                          checked={selectedCheckboxes.includes(`${index + 1}`)}
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
                <div className="flex flex-col justify-center my-10">
                  <button
                    type="button"
                    className="text-white text-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-align-center mr-2 mb-2"
                    onClick={handleExtract}
                  >
                    Extract
                  </button>
                  <button
                    type="button"
                    className="text-white text-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-align-center mr-2 mb-2"
                    onClick={chooseAnother}
                  >
                    Choose Another
                  </button>

                  <button
                    onClick={handleDownload}
                    className="text-white text-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-align-center mr-2 mb-2"
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
    </div>
  );
};

export default Editor;
