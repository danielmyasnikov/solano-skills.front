import React from 'react';
import { Modal, FormControl, InputLabel, Input, FormHelperText, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@components/mui/button';

const Root = styled(Container)`
  margin-top: 200px;
  width: 600px;
  height: 500px;
  background: var(--color-grey);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CertModal = ({ onSubmit, isShow }) => {
  return (
    <Modal open={isShow}>
      <Root>
        <FormControl>
          <InputLabel htmlFor="my-input">Фамилия</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Имя</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Отчество</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
        <Button onClick={onSubmit}>Подтвердить</Button>
      </Root>
    </Modal>
  );
};

export default CertModal;
