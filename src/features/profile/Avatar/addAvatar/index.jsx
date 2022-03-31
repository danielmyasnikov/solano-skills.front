import React, { useRef, useState } from 'react';

import { CropAvatar } from '../cropAvatar';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { patchProfile } from '@store/profile/actions';
import * as AuthStore from '@store/auth';

import Close from '@assets/Close.js';

import styles from './styles.module.less';

export const AddAvatar = ({ handleClick, open }) => {
  const [isShowCrop, setIsShowCrop] = useState(false);
  const [cropImg, setCropImg] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(open);

  const showCropHandler = () => setIsShowCrop(!isShowCrop);

  const cropAvatarRef = useRef();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const dispatch = useDispatch();

  const getCroppedImgHandler = (img) => setCropImg(img);

  const sendImgHandler = () => {
    setModalVisibility(false);
    dispatch(
      patchProfile({
        avatar: cropImg,
        headers: headers,
      }),
    );
  };

  return (
    <Dialog
      className={styles.dialog}
      maxWidth="lg"
      fullWidth
      open={modalVisibility}
      onClose={handleClick}
    >
      <DialogTitle className={styles.dialogTitle}>
        <span className={styles.dialogTitleText}>Загрузка новой фотографии</span>
        <div className={styles.closeButton} onClick={handleClick}>
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
        <CropAvatar
          onCropped={(img) => getCroppedImgHandler(img)}
          ref={cropAvatarRef}
          handleActionWithImage={showCropHandler}
        />
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
          <Button variant="containedPurple" onClick={sendImgHandler}>
            Сохранить и продолжить
          </Button>
          <Button variant="outlinePurple" onClick={() => cropAvatarRef.current.removeImage()}>
            Вернуться
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
