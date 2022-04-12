import Modal from '@mui/material/Modal';

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTakeCertificateMutation } from '@src/features/certificates/certificates.api';
import { useHistory } from 'react-router';

const Root = styled(Box)`
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: calc(500px - 28px);
  overflow-y: auto;
  padding: 50px 20px;
  z-index: 12;
  left: 50%;
  top: 50%;
  background: #f8f8f8;
  border-radius: 20px;

  .dropZone {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > svg {
      margin-bottom: 32px;
    }

    h2 {
      font-family: 'Jost';
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 28px;

      text-align: center;
      letter-spacing: 0.02em;
      text-transform: uppercase;

      color: #2d2d2d;

      margin-bottom: 20px;
    }

    p {
      font-family: 'Nunito';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 127%;

      text-align: center;

      color: #2d2d2d;

      margin-bottom: 30px;
    }
  }
`;

export const CongratulationsModal = ({ isShow }) => {
  const history = useHistory();
  const { courseId } = useParams();
  const [takeCertificateMutation, { isLoading: isUpdating }] = useTakeCertificateMutation();
  const takeCertificate = async () => {
    const res = await takeCertificateMutation({ courseId });
    history.push(`/certificates/${res.data.id}`);
  };

  return (
    <Modal open={isShow}>
      <Root>
        <div className="dropZone">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
          >
            <path
              d="M21.784 37.2043L14.0189 29.4391C13.1002 28.5204 13.1002 27.031 14.0189 26.1123C14.9363 25.1949 16.4232 25.1935 17.3424 26.1091L21.784 30.5336L35.644 16.6736C36.5674 15.7502 38.0652 15.7529 38.9853 16.6795C39.9008 17.6015 39.8981 19.0902 38.9794 20.0089L21.784 37.2043Z"
              fill="#7469EF"
            />
            <circle cx="25.5" cy="25.5" r="23.5" stroke="#7469EF" strokeWidth="4" />
          </svg>
          <h2>Поздравляем! Курс завершен!</h2>
          <p>За успешно пройденный курс вы можете получить сертификат</p>
          <Button onClick={takeCertificate} variant="containedPurple" disabled={isUpdating}>
            {isUpdating ? 'Загружаем сертификат...' : 'Перейти к сертификату'}
          </Button>
        </div>
      </Root>
    </Modal>
  );
};
