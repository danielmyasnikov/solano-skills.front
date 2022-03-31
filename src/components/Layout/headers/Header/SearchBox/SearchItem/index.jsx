import { styled } from '@mui/material/styles';
import miniPython from '@assets/miniPython.png';
import { Link } from 'react-router-dom';

const Item = styled('div')`
  margin-top: 10px;
  display: flex;
  width: 95%;
  cursor: pointer;
`;

const Icon = styled('img')`
  margin: 2px 10px 0 0;
  width: 14px;
  height: 14px;
`;

const Text = styled('p')`
  font-family: 'Nunito';
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.15px;
  color: var(--color-black);
`;

const SearchItem = ({ icon, text, link }) => {
  console.log(link);
  return (
    <Link to={link}>
      <Item>
        <Icon src={miniPython} />
        <Text>{text}</Text>
      </Item>
    </Link>
  );
};

export default SearchItem;
