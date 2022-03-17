import CircularProgress from '@mui/material/CircularProgress';

export const Preloader = ({ color = '#7469EF', size = '40px' }) => {
  return <CircularProgress style={{ color: '#7469EF', width: size, height: size }} />;
};
