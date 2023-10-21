import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const Editor: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };
 console.log(numPages)
  return (
 
    <div className="flex flex-wrap">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">PDF Viewer</h1>
        <div className="rounded-md p-4 h-[35rem] shadow-2xl overflow-y-auto">
        <div >
                 <Document
                  file="/sample2.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages),(el, index) => (
                    <Page  key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              </div>
         
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-4 ">
        <h1 className="text-2xl font-bold mb-4 text-center">Editor</h1>
        <div className="rounded-md p-4 flex justify-center shadow-2xl h-[35rem] ">
          {/* Non-scrollable content */}
          <div >

          <p className="text-center">Extract PDF</p>
          <p className="text-center">Number of Pages: {numPages}</p>
           {/* Buttons */}
           <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Button 1</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Button 2</button>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Editor;
