import { useParams } from 'react-router';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Slide,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef, ReactElement, Ref, useState } from 'react';
import { PhotoCamera } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;

  padding-top: 64px;
  padding-bottom: 64px;
`;

const AdminInput = styled(TextField)`
  & > div {
    border-radius: 4px;
  }
`;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserPage() {
  const [openAvatarUrlDialog, setOpenAvatarUrlDialog] = useState(false);

  const { userId } = useParams<{ userId: string }>();

  const [avatarUrl, setAvatarUrl] = useState('');
  const [tempAvatarUrl, setTempAvatarUrl] = useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [preview, setPreview] = useState('');
  const [description, setDescription] = useState('');

  const [role, setRole] = useState('user');
  const [isActive, setIsActive] = useState(true);

  return (
    <Container>
      <Wrapper>
        <Breadcrumbs sx={{ mb: '16px' }}>
          <Link underline="hover" color="inherit" href="/admin">
            Admin Panel
          </Link>
          <Link underline="hover" color="inherit" href="/admin/courses">
            Пользователи
          </Link>
          <Typography color="text.primary">{userId}</Typography>
        </Breadcrumbs>
        <Card sx={{ borderRadius: '12px' }}>
          <CardContent>
            <Grid container sx={{ pt: '24px' }} spacing={4}>
              <Grid
                item
                xs={2}
                md={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <label htmlFor="avatar-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload avatar"
                    component="span"
                    onClick={() => {
                      setTempAvatarUrl(avatarUrl);
                      setOpenAvatarUrlDialog(true);
                    }}
                  >
                    {avatarUrl && avatarUrl !== '' ? <Avatar src={avatarUrl} /> : <PhotoCamera />}
                  </IconButton>
                </label>
              </Grid>
              <Grid item xs={10} md={5}>
                <AdminInput
                  label="Имя"
                  value={name}
                  fullWidth
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AdminInput
                  label="Фамилия"
                  value={surname}
                  fullWidth
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <AdminInput
                  label="Превью"
                  value={preview}
                  fullWidth
                  onChange={(e) => {
                    setPreview(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <AdminInput
                  label="Описание"
                  value={description}
                  fullWidth
                  multiline
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="lang-label">Роль</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role-select"
                    value={role}
                    label="Роль"
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ borderRadius: '6px' }}
                  >
                    <MenuItem value="super-user">Супер-Пользователь</MenuItem>
                    <MenuItem value="admin">Админ</MenuItem>
                    <MenuItem value="instructor">Инструктор</MenuItem>
                    <MenuItem value="user">Пользователь</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  sx={{ m: 0 }}
                  value={isActive}
                  control={<Switch checked={isActive} onChange={() => setIsActive(!isActive)} />}
                  label="Активен"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                {/* @ts-ignore */}
                <Button variant="containedRed" sx={{ ml: 'auto' }}>
                  Удалить
                </Button>
                {/* @ts-ignore */}
                <Button variant="containedGreen">Сохранить</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Wrapper>
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        open={openAvatarUrlDialog}
        onClose={() => setOpenAvatarUrlDialog(false)}
      >
        <DialogTitle>Change Avatar Url</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Avatar Url"
            type="text"
            fullWidth
            variant="standard"
            value={tempAvatarUrl}
            onChange={(e) => {
              setTempAvatarUrl(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setTempAvatarUrl(avatarUrl);
              setOpenAvatarUrlDialog(false);
            }}
            // @ts-ignore
            variant="containedRed"
            sx={{ ml: 'auto' }}
          >
            Закрыть
          </Button>
          <Button
            // @ts-ignore
            variant="containedGreen"
            onClick={() => {
              setAvatarUrl(tempAvatarUrl);
              setOpenAvatarUrlDialog(false);
            }}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
