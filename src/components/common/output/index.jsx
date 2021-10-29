import React, { useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import { Viewer, Worker } from '@react-pdf-viewer/core';

const Output = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState('output');
  return (
    <>
      <div className={cn(styles.terminalHeader, styles.outputHeader)}>
        <div
          onClick={() => setActiveTab('output')}
          className={cn(activeTab === 'output' ? styles.tabActive : '', styles.tab)}
        >
          Вывод
        </div>
        <div
          onClick={() => setActiveTab('slides')}
          className={cn(activeTab === 'slides' ? styles.tabActive : '', styles.tab)}
        >
          Слайды
        </div>
      </div>
      <div className={className}>
        {activeTab === 'slides' && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer fileUrl="python-for-beginners.pdf" />;
          </Worker>
        )}
        {children}
      </div>
    </>
  );
};

export default Output;
