import { WrapHeader } from '@components/common/wrapHeader';
import Skill from './Skill';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Redirect, useParams } from 'react-router';
import { useGetSkillsQuery } from '@src/features/skills/skills.api';
import { Preloader } from '@components/mui/Preloader';
import { Helmet } from 'react-helmet';

const Wrapper = styled('div')`
  width: 100%;
  position: relative;
`;

const SkillsList = styled(Box)`
  position: relative;
  top: -19px;
  display: grid;
  grid-gap: 30px 23px;
  grid-template-columns: repeat(auto-fit, minmax(370px, 370px));
  justify-content: center;
  padding-bottom: 100px;

  @media screen and (max-width: 830px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`;

const SkillsPage = () => {
  const { data: skills, error, isLoading } = useGetSkillsQuery();

  console.log(isLoading);

  if (error) {
    return <Redirect to={'/404'} />;
  }

  return (
    <Wrapper>
      <Helmet title="Ваши навыки">
        <meta
          name="description"
          content="Отточите свои навыки, выполняя быстрые ежедневные задания на компьютере или в мобильном приложении DeepSkills."
        />
      </Helmet>
      <WrapHeader variant={'skills'} />
      <SkillsList>
        {isLoading ? (
          <Preloader size={'100px'} />
        ) : (
          <>
            {skills.map(({ title, description, info }) => (
              <Skill key={title} title={title} description={description} info={info} />
            ))}
          </>
        )}
      </SkillsList>
    </Wrapper>
  );
};

export default SkillsPage;
