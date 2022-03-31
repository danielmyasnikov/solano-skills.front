import { Switch as MuiSwitch } from '@mui/material';
import { styled } from '@mui/styles';

const Root = styled(MuiSwitch)`
  .MuiSwitch-root {
    .MuiSwitch-track {
      background: #8a92a6 !important;
    }
    .Mui-checked + .MuiSwitch-track {
      background-color: var(--purple) !important;
    }
    .Mui-checked {
      color: var(--purple) !important;
    }
  }
`;

const Switch = ({ checked, handleChange }) => <Root checked={checked} onChange={handleChange} />;

export default Switch;
