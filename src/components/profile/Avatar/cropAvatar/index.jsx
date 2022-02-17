import React, { useState, useRef, useCallback } from 'react';

import Button from '@components/mui/button';
import ReactCrop from 'react-image-crop';

import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import 'react-image-crop/dist/ReactCrop.css';

import styles from './styles.module.less';

export const CropAvatar = ({ uploadImage }) => {
  const Input = styled('input')({
    display: 'none',
  });

  const hiddenFileInput = React.useRef(null);
  const cropRef = useRef(null);

  const [crop, setCrop] = useState({
    unit: 'px',
    width: 250,
    height: 250,
    aspect: 4 / 4,
  });
  const [rotate, setRotate] = useState(0);
  const [src, setSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          setSrc(reader.result);
          uploadImage();
        },
        false,
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleClick = () => hiddenFileInput.current.click();

  const rotateRightHandler = () => (rotate === 360 && setRotate(0)) || setRotate(rotate + 90);

  const rotateLeftHandler = () => (rotate === -360 && setRotate(0)) || setRotate(rotate - 90);

  const onImageLoaded = useCallback((img) => {
    cropRef.current = img;
  }, []);

  const makeClientCrop = async (crop) => {
    if (cropRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(cropRef.current, crop, 'newFile.jpeg');
      setCroppedImage(croppedImage);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
    });
  };

  const onCropComplete = (crop) => makeClientCrop(crop);

  const onCropChange = (crop) => setCrop(crop);

  return (
    <>
      {(src && (
        <div className={styles.rotateImgContainer}>
          <span>Выбранная область будет показываться на вашей странице.</span>
          <span>Если изображение ориентировано неправильно, фотографию можно повернуть.</span>
          <div className={styles.cropImgContainer}>
            <ReactCrop
              src={src}
              crop={crop}
              rotate={rotate}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
            <div className={styles.rotateButtonContainer}>
              <IconButton onClick={rotateLeftHandler}>
                <RotateLeftIcon />
              </IconButton>
              <IconButton onClick={rotateRightHandler}>
                <RotateRightIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )) || (
        <label className={styles.addImgButtonLabel} htmlFor="contained-button-file">
          <Button className={styles.addImgButton} variant="containedPurple" onClick={handleClick}>
            Выбрать файл
          </Button>
          <Input accept="image/*" type="file" ref={hiddenFileInput} onChange={onSelectFile} />
        </label>
      )}
    </>
  );
};
