import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { compileShell, startKernel } from '@store/terminal/actions';
import { selectTerminal } from '@store/terminal/selector';

import { PDFViewer } from '../pdfViewer';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import styles from './styles.module.less';
import cn from 'classnames';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const Placeholder = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 18px;
  z-index: 100;
  background-color: rgb(0 0 0 / 15%);
  backdrop-filter: blur(2px);
`;

const LoadingText = styled(Typography)`
  color: white;
  font-family: 'Jost', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 127%;
  text-align: center;
  white-space: nowrap;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    display: inline-block;
    animation: dotty steps(1, end) 1.5s infinite;
    content: '';
  }

  @keyframes dotty {
    0% {
      content: '';
    }
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  }
`;

const Separator = styled(Box)`
  width: 2px;
  min-height: 44px;

  background-color: #2c2a3f;
`;

const FolderIcon = styled(Box)`
  display: flex;
  align-items: center;

  margin-left: auto;

  height: 100%;
  width: auto;

  cursor: pointer;
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 16px;
  margin-left: 14px;
  margin-bottom: -4px;

  &.left {
    margin: 0;
  }

  &.open {
    margin-left: 10px;
  }

  width: 24px;
  height: 24px;
`;

const Output = ({
  variant,
  isAuth = false,
  presentation_url,
  bulletExercise = {},
  isBulletPointExercise = false,
}) => {
  const [folded, setFolded] = useState(false);
  const [activeTab, setActiveTab] = useState('output');
  const [lineNumber, setLineNumber] = useState(1);
  const [code, setCode] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const outputRef = useRef();

  const { exerciseId } = useParams();

  const terminal = useSelector(selectTerminal);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        compileShell({
          code: code,
          exerciseId: exerciseId,
          lineNumber: lineNumber,
          kernelId: terminal.kernelId,
          isGraphRequired: false,
        }),
      );
      setLineNumber(lineNumber + 1);
      setCode('');
    }
  };

  useEffect(() => {
    if (isBulletPointExercise) {
      dispatch(startKernel(bulletExercise.id));
    } else {
      dispatch(startKernel(exerciseId));
    }
  }, [exerciseId]);

  useEffect(() => {
    if (terminal.kernelId) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [terminal.kernelId]);

  useEffect(() => {
    if (outputRef && terminal.outputs) {
      outputRef?.current?.scroll({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [terminal]);

  return (
    <div
      className={cn(
        styles.outputWrapper,
        {
          [styles.fullHeight]: variant === 'quizOutputContainer',
        },
        {
          [styles.folded]: folded,
        },
      )}
    >
      <div className={cn(styles.terminalHeader, styles.outputHeader)}>
        <div
          onClick={() => setActiveTab('output')}
          className={cn((activeTab === 'output' && styles.tabActive) || '', styles.tab)}
        >
          Консоль
        </div>
        <div
          onClick={() => setActiveTab('slides')}
          className={cn((activeTab === 'slides' && styles.tabActive) || '', styles.tab)}
        >
          Слайды
        </div>

        <FolderIcon onClick={() => setFolded(!folded)}>
          <Separator />
          <IconWrapper>
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              style={
                folded
                  ? {
                      transform: 'rotate(180deg)',
                      marginBottom: '2.5px',
                    }
                  : {}
              }
            >
              <path
                d="M1.88 0.453125L8 6.55979L14.12 0.453125L16 2.33312L8 10.3331L0 2.33312L1.88 0.453125Z"
                fill="white"
              />
            </svg>
          </IconWrapper>
        </FolderIcon>
      </div>
      {!folded && (
        <div
          className={styles[variant]}
          style={{
            position: 'relative',
          }}
        >
          {isDisabled && <Placeholder />}
          {(activeTab === 'slides' && <PDFViewer src={presentation_url} />) || (
            <div ref={outputRef} className={styles.content}>
              {terminal.outputs.map((item, i) => (
                <div
                  key={i}
                  className={cn(styles.terminalLine, { [styles.shell]: item.status === 'shell' })}
                  dangerouslySetInnerHTML={{ __html: item.error || item.output }}
                />
              ))}
              <div className={styles.shell}>
                <span>In [{lineNumber}]:</span>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  onKeyDown={onSubmit}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Output;
