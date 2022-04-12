import { useSelector } from 'react-redux';

import { selectExerciseSidebar } from '@src/features/exercises/store/selectors/exercises.selectors';
import { selectCurrentExercise } from '@src/features/exercises/store/selectors/exercise.selectors';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useEffect } from 'react';

const Content = styled(Box)`
  height: 50%;
  padding: 15px 20px 40px;

  p {
    margin-top: 20px;

    & > img {
      display: block;
      width: 100%;
    }
  }

  p,
  li,
  code {
    font-size: 16px;
  }

  li {
    margin-left: 20px;
    list-style-type: decimal;
  }

  table {
    background-color: #fff;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: left;
    width: 100%;

    margin-top: 20px;

    border-top: 1px solid #05192d;

    p {
      margin-top: 0;
    }

    th {
      padding: 10px;
      text-align: left;

      color: #05192d;
    }

    tr {
      border-bottom: 1px solid var(--very-light-gray-fifth);
    }

    tr:nth-of-type(2n) {
      background: var(--very-light-gray-fourth);
    }

    td {
      color: #05192d;
      padding: 10px;
      vertical-align: middle;
    }
  }
`;

export default function SidebarBody() {
  const { title, description } = useSelector(selectCurrentExercise);
  const { headerFolded } = useSelector(selectExerciseSidebar);

  useEffect(() => {}, []);

  if (headerFolded) {
    return null;
  }

  return (
    <Content>
      <h1>{title || 'Заголовок не задан'}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </Content>
  );
}
