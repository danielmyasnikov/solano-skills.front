import React, { useState, useEffect } from 'react';
import styles from './styles.module.less';
import { PDFViewer } from '@components/common/pdfViewer';
import { getCertificate } from '../../store/api/certificate';

export const StatementPage = () => {
  const [url, setUrl] = useState('');
  const data = {
    "html": "<h1>hello</h1>",
    "force": "true",
  };

  useEffect(() => {
    async function getData(data) {
      let responce = await getCertificate(data);
      setUrl(responce);
    }
    getData(data);
  }, []);

  return (
    <div className={styles.wrapper}>
      <PDFViewer src={url} />
    </div>
  );
};
