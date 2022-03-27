import Close from '@assets/Close';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const Root = styled(Box)`
  display: none;
  position: relative;
  padding: 20px 34px;
  font-family: Nunito;
  font-weight: 600;
  font-size: 16px;
  line-height: 127%;
  color: #2c5f14;
  background: #c4ffa9;
  border-radius: 12px;
  margin-bottom: 25px;

  @media screen and (max-width: 640px) {
    display: block;
  }
`;

const IconWrapper = styled(Box)`
  position: absolute;
  width: 14px;
  right: 15px;
  top: 15px;
  path {
    fill: #79c157;
  }
`;

const key = 'warning';

const WarningMobile = () => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(key)) {
      setHidden(false);
    }
  }, []);

  const onClose = () => {
    localStorage.setItem(key, 'hidden');
    setHidden(true);
  };

  if (hidden) {
    return null;
  }

  return (
    <Root>
      Обращаем Ваше внимание, что оптимальным способом обучения на нашей платформе является ПК или
      планшет.
      <IconWrapper onClick={onClose}>
        <Close />
      </IconWrapper>
    </Root>
  );
};

export default WarningMobile;
