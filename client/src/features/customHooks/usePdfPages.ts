import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


function usePdfPages(pdfUrl: string | null): number | null {
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPdfPages() {
      if (!pdfUrl) {
        // If pdfUrl is null, reset numPages to null
        setNumPages(null);
        return;
      }

      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdfDocument = await loadingTask.promise;
        const numPages = pdfDocument.numPages;
        setNumPages(numPages);
      } catch (error) {
        console.error('Error loading the PDF:', error);
      }
    }

    fetchPdfPages();
  }, [pdfUrl]);

  return numPages;
}
export default usePdfPages;