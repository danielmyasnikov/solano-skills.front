import { WrapHeader } from '@components/common/wrapHeader';
import Profession from './Profession';
import { useGetProfessionsQuery } from '@src/features/professions/professions.api';
import { Redirect } from 'react-router';
import { Preloader } from '@components/mui/Preloader';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const Wrapper = styled('div')`
  width: 100%;
  position: relative;
`;

const ProfessionsList = styled(Box)`
  position: relative;
  top: -19px;
  display: grid;
  grid-gap: 30px 23px;
  grid-template-columns: repeat(auto-fit, minmax(370px, 370px));
  justify-content: center;

  @media screen and (max-width: 830px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`;

const ProfessionsPage = () => {
  const { data: professions, error, isLoading } = useGetProfessionsQuery();

  console.log(isLoading);

  if (error) {
    return <Redirect to={'/404'} />;
  }

  return (
    <Wrapper>
      <WrapHeader variant={'professions'} />
      <ProfessionsList>
        {isLoading ? (
          <Preloader size={'100px'} />
        ) : (
          <>
            {professions.map(({ title, description, info }, i) => (
              <Profession key={i} title={title} description={description} info={info} />
            ))}
          </>
        )}
      </ProfessionsList>
    </Wrapper>
  );
};

export default ProfessionsPage;
