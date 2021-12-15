import React, { useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { useDispatch } from 'react-redux';
import { compileShell } from '@store/terminal/actions';
import { useParams } from 'react-router-dom';

const Output = ({ children, className, presentation_url }) => {
  const [activeTab, setActiveTab] = useState('output');
  const [lineNumber, setLineNumber] = useState(1);
  const [code, setCode] = useState('');
  const { exerciseId } = useParams();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    if (e.keyCode === 13) {
      dispatch(compileShell(code, exerciseId, lineNumber));
      setLineNumber(lineNumber + 1);
      setCode('');
    }
  };
  return (
    <>
      <div className={cn(styles.terminalHeader, styles.outputHeader)}>
        <div
          onClick={() => setActiveTab('output')}
          className={cn(activeTab === 'output' ? styles.tabActive : '', styles.tab)}
        >
          Консоль
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
            <Viewer
              fileUrl={
                presentation_url ||
                'https://storage.yandexcloud.net/presos/Prod-%D0%A1%D0%BB%D0%B0%D0%B9%D0%B4%D1%8B-Python-%D0%B4%D0%BB%D1%8F-%D0%BD%D0%B0%D1%87%D0%B8%D0%BD%D0%B0%D1%8E%D1%89%D0%B8%D1%85-%D0%A7%D0%B0%D1%81%D1%82%D1%8C-I%20(1).pdf'
              }
            />
            ;
          </Worker>
        )}
        {activeTab === 'output' && (
          <React.Fragment>
            {children}
            <div className={styles.shell}>
              <span>In [{lineNumber}]:</span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                onKeyDown={onSubmit}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

export default Output;
