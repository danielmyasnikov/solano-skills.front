import { Box, styled } from '@mui/material';
import SearchItem from '@components/Layout/headers/Header/SearchBox/SearchItem';

const Root = styled(Box)`
  position: absolute;
  padding: 20px;
  top: 44px;
  left: 0;
  width: 400px;
  background: var(--color-white);
  border: 1px solid var(--light-grayish-blue);
  box-shadow: 4px 4px 17px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
`;

const Title = styled('h5')`
  font-family: 'Jost';
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: #b5b8bb;
`;

const SearchBox = ({ isShow, courses, searchValue }) => {
  const values =
    searchValue === ''
      ? courses?.map((e) => ({ title: e.title, icon: e.icon, link: `/courses/${e.slug}` }))
      : courses
          ?.filter((e) => e.title.includes(searchValue))
          .map((e) => ({ title: e.title, icon: e.icon, link: `/courses/${e.slug}` }));

  return (
    <>
      {isShow && (
        <Root>
          {values && values.length > 0 ? (
            <>
              <Title>Курсы</Title>
              {values.map(({ icon, title, link }) => (
                <SearchItem icon={icon} text={title} link={link} />
              ))}
            </>
          ) : (
            <span>Ничего не найдено</span>
          )}
        </Root>
      )}
    </>
  );
};

export default SearchBox;
