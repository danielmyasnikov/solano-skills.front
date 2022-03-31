import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const RadioButton = ({ checked, value, className, onChange }) => (
  <RadioGroup
    sx={{
      '&.MuiFormGroup-root': {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'start',
      },
    }}
    className={className}
    row
  >
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
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label onClick={onChange} dangerouslySetInnerHTML={{ __html: value }} />
  </RadioGroup>
);

export default RadioButton;
