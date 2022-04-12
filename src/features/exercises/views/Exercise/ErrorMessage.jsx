import { useSelector } from 'react-redux';

import { selectExerciseContext } from '@src/features/exercises/store/selectors/exercise.selectors';

import Error from '@assets/Error';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const Root = styled(Box)`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  background: rgba(244, 67, 54, 0.06);
  border-radius: 18px;
  border: 1px solid #f44433;
  padding: 17px;
`;

const Content = styled(Box)`
  width: 100%;

  h6 {
    font-family: 'Jost', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #621b16;
  }

  span {
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    color: #6c2924;
  }

  code {
    background: #2c2a3f;
    color: #fff;
  }
`;

export default function ErrorMessage() {
  const { error } = useSelector(selectExerciseContext);

  return (
    <>
      {error && (
        <Root>
          <Error />
          <Content>
            <h6>Некорректный ответ</h6>
            <span
              dangerouslySetInnerHTML={{
                __html: error.replace(/`(.*?)`/g, '<code>$1</code>'),
              }}
            />
          </Content>
        </Root>
      )}
    </>
  );
}
