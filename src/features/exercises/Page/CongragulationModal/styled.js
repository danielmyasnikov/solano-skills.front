import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Root = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 504px;
  outline: none;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: var(--color-white);
  box-shadow: 0px 4px 97px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 40px 55px;

  h1 {
    margin-top: 30px;
    margin-bottom: 15px;
    font-family: 'Jost';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  span {
    margin-bottom: 25px;
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
  }
`;
