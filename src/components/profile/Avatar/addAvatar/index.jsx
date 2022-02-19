import React, { useRef, useState } from 'react';

import { CropAvatar } from '../cropAvatar';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '@components/mui/button';

import Close from '@assets/Close.js';

import styles from './styles.module.less';

export const AddAvatar = ({ handleClick, open }) => {
  const [isShowCrop, setIsShowCrop] = useState(false);

  const showCropHandler = () => setIsShowCrop(!isShowCrop);

  const cropAvatarRef = useRef();

  return (
    <Dialog className={styles.dialog} maxWidth="lg" fullWidth open={open} onClose={handleClick}>
      <DialogTitle className={styles.dialogTitle}>
        <span className={styles.dialogTitleText}>Загрузка новой фотографии</span>
        <div onClick={handleClick}>
          <Close />
        </div>
      </DialogTitle>

      <DialogContent className={styles.dialogContent}>
        {!isShowCrop && (
          <div>
            <span>
              Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию.
            </span>
            <span>Вы можете загрузить изображение в формате JPG, GIF или PNG.</span>
          </div>
        )}
        <CropAvatar ref={cropAvatarRef} handleActionWithImage={showCropHandler} />
      </DialogContent>

      {(!isShowCrop && (
        <DialogActions className={styles.dialogActions}>
          <span>
            Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего
            размера.
          </span>
        </DialogActions>
      )) || (
        <DialogActions className={styles.dialogActionsButtons}>
          <Button variant="containedPurple">Сохранить и продолжить</Button>
          <Button variant="outlinePurple" onClick={() => cropAvatarRef.current.removeImage()}>
            Вернуться
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
