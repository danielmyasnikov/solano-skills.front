/* eslint-disable react/no-danger */
import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { compileShell, startKernel } from '@store/terminal/actions';
import { selectTerminal } from '@store/terminal/selector';

import cn from 'classnames';

import { PDFViewer } from '../pdfViewer';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import styles from './styles.module.less';

const Output = ({ variant, presentationUrl }) => {
  const [activeTab, setActiveTab] = useState('output');
  const [lineNumber, setLineNumber] = useState(1);
  const [code, setCode] = useState('');

  const outputRef = useRef();

  const { exerciseId } = useParams();

  const terminal = useSelector(selectTerminal);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        compileShell({
          code,
          exerciseId,
          lineNumber,
          kernelId: terminal.kernelId,
          isGraphRequired: false,
        }),
      );
      setLineNumber(lineNumber + 1);
      setCode('');
    }
  };

  useEffect(() => {
    dispatch(startKernel(exerciseId));
  }, [exerciseId]);

  useEffect(() => {
    if (outputRef && terminal.outputs) {
      outputRef?.current?.scroll({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [terminal]);

  return (
    <div
      className={cn(styles.outputWrapper, {
        [styles.fullHeight]: variant === 'quizOutputContainer',
      })}
    >
      <div className={cn(styles.terminalHeader, styles.outputHeader)}>
        <div
          role="presentation"
          onClick={() => setActiveTab('output')}
          className={cn((activeTab === 'output' && styles.tabActive) || '', styles.tab)}
        >
          Консоль
        </div>
        <div
          role="presentation"
          onClick={() => setActiveTab('slides')}
          className={cn((activeTab === 'slides' && styles.tabActive) || '', styles.tab)}
        >
          Слайды
        </div>
      </div>
      <div className={styles[variant]}>
        {(activeTab === 'slides' && <PDFViewer src={presentationUrl} />) || (
          <>
            <div ref={outputRef} className={styles.content}>
              {terminal.outputs.map((item) => (
                <div
                  key={uuid()}
                  className={cn({ [styles.shell]: item.status === 'shell' })}
                  dangerouslySetInnerHTML={{ __html: item.error || item.output }}
                />
              ))}
            </div>
            <div className={styles.shell}>
              <span>In [{lineNumber}]:</span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                onKeyDown={onSubmit}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Output;
