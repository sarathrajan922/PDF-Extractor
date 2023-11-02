import { useState } from 'react';

const usePdfBufferToUrl = () => {
  const [url, setPdfUrl] = useState<string | null>(null);

  const convertBufferToPdfUrl = (buffer: number[]): void => {
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  return { url, convertBufferToPdfUrl };
};

export default usePdfBufferToUrl;
