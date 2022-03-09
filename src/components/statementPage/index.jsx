import React, { useState, useEffect } from 'react';
import styles from './styles.module.less';
import { PDFViewer } from '@components/common/pdfViewer';
import { getCertificate } from '../../store/api/certificate';
// import { Logo } from './images/logo';
// import { Signature } from './images/signature';

export const StatementPage = () => {
  const [name, setName] = useState('Фамилия Имя Отчество');
  const [course, setCourse] = useState('Введение в Python');
  const [date, setDate] = useState('20.01.2021');
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
