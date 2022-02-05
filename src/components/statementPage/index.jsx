import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const StatementPage = ({ statement_url }) => {
  const layout = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
      <Viewer 
        plugins={[layout]}
        fileUrl={ statement_url || 'https://storage.yandexcloud.net/presos/Prod-%D0%A1%D0%BB%D0%B0%D0%B9%D0%B4%D1%8B-Python-%D0%B4%D0%BB%D1%8F-%D0%BD%D0%B0%D1%87%D0%B8%D0%BD%D0%B0%D1%8E%D1%89%D0%B8%D1%85-%D0%A7%D0%B0%D1%81%D1%82%D1%8C-I%20(1).pdf' }
        />;
    </Worker>
  )
}

export default StatementPage