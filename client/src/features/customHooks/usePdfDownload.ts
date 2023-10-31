import { useState } from 'react';

type DownloadHook = {
  handleDownload: (url: string, fileName?: string) => void;
};

const usePdfDownload = (): DownloadHook => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleDownload = (url: string, fileName?: string) => {
    setPdfUrl(url);
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || 'downloaded.pdf';
      link.click();
    }
  };

  return { handleDownload };
};

export default usePdfDownload;
