import { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useTakeCertificateWithFioMutation } from '@src/features/certificates/certificates.api';
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

  .content {
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

const Input = styled('input')`
  margin-bottom: 25px;

  width: 100%;
  padding: 15px;
  border: 1px solid var(--lavender);
  border-radius: 10px;
  outline: none;
  color: var(--light-gray-two);

  font-weight: 700;
  font-family: 'Nunito';
  font-style: normal;
  font-size: 14px;
  line-height: 127%;

  &::placeholder {
    color: #d6d6d6;
  }

  &:focus {
    color: var(--dark);
  }
`;

const FailFIOModal = ({ isShow }) => {
  const history = useHistory();
  const [value, setValue] = useState('');
  const { courseId } = useParams();
  const [takeCertificateMutation] = useTakeCertificateWithFioMutation();
  const takeCertificate = async () => {
    const res = await takeCertificateMutation({ courseId, name: value });
    history.push(`/certificates/${res.data.id}`);
  };

  return (
    <Modal open={isShow}>
      <Root>
        <div className="content">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path
              d="M25 48C37.7025 48 48 37.7025 48 25C48 12.2975 37.7025 2 25 2C12.2975 2 2 12.2975 2 25C2 37.7025 12.2975 48 25 48Z"
              stroke="#DE4949"
              strokeWidth="4"
            />
            <path
              d="M21.6602 12.7998L22.9562 29.3598H28.0322L29.3282 12.7998H21.6602ZM21.6602 35.5518C21.6602 36.5598 22.0202 37.3758 22.7402 37.9998C23.4602 38.6478 24.3722 38.9718 25.4762 38.9718C26.6042 38.9718 27.5162 38.6478 28.2122 37.9998C28.9322 37.3758 29.2922 36.5598 29.2922 35.5518C29.2922 34.5198 28.9322 33.6918 28.2122 33.0678C27.5162 32.4198 26.6042 32.0958 25.4762 32.0958C24.3722 32.0958 23.4602 32.4198 22.7402 33.0678C22.0202 33.6918 21.6602 34.5198 21.6602 35.5518Z"
              fill="#DE4949"
            />
          </svg>
          <h2>Упс, у нас нет данных для вашего сертификата</h2>
          <p>Пожалуйста, заполните полностью Ваше ФИО</p>
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="ФИО" />
          <Button variant="containedPurple" onClick={takeCertificate}>
            Подтвердить
          </Button>
        </div>
      </Root>
    </Modal>
  );
};

export default FailFIOModal;
