import React, { useEffect, useState } from "react";
import { PdfListInterface } from "../../types/pdfListData";
import { userGetAllCreatedPdfsNames } from "../../features/axios/api/userGetAllPdfNames";
import { userGetCreatedPdf } from "../../features/axios/api/userGetCreatedPdf";
import usePdfDownload from "../../features/customHooks/usePdfDownload";
const PDFList: React.FC = () => {
  const [pdfList, setPdfList] = useState<PdfListInterface[] | null>(null);
  const [pdfUrl, setPdfUrl] = useState<any>(null);
  const [fileName, setFileName] = useState<string>("");
  const { handleDownload } = usePdfDownload();
  useEffect(() => {
    userGetAllCreatedPdfsNames()
      .then((response) => {
        setPdfList(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handlePdfDownload = (pdfId: string, fileName: string) => {
    userGetCreatedPdf(pdfId)
      .then((response) => {
        setFileName(fileName);
        // Convert the binary data to Blob or Uint8Array, create a URL
        const pdfUrl = convertBufferToPdfUrl(response.data.data);
        setPdfUrl(pdfUrl);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (pdfUrl) {
      handleDownload(pdfUrl, fileName);
    }
  }, [pdfUrl]);

  //this function convertBuffer Data of a pdf into pdfUrl string
  const convertBufferToPdfUrl = (buffer: number[]): string => {
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  return (
    <div className="flex w-full min-h-screen justify-center ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                PDF Name
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Download
              </th>
            </tr>
          </thead>
          {pdfList &&
            pdfList.map((doc) => (
              <tbody>
                <tr className="bg-white border-b  hover:bg-gray-50 ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {doc?.pdfName}
                  </th>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        handlePdfDownload(doc?.pdfId, doc?.pdfName);
                      }}
                      className="text-blue-800 underline"
                    >
                      Click Here
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default PDFList;
