import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { url_slug } from '@src/features/admin/course/slug-util';

const AdminInput = styled(TextField)`
  & > div {
    border-radius: 4px;
  }
`;

const RadioButton = ({
  isCorrect,
  onIsCorrectChange,
  content,
  onContentChange,
  error,
  onErrorChange,
}) => (
  <Box sx={{ display: 'flex', gap: '12px' }}>
    <Radio
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: 21,
        },
        color: '#7469EF',
        '&.Mui-checked': {
          color: '#7469EF',
        },
        '&.MuiRadio-root': {
          padding: '0 9px',
        },
      }}
      checked={isCorrect}
      onChange={onIsCorrectChange}
    />
    <AdminInput label="Контент" value={content} fullWidth onChange={onContentChange} />
    {!isCorrect && <AdminInput label="Ошибка" value={error} fullWidth onChange={onErrorChange} />}
  </Box>
);

export default RadioButton;
