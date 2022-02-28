import React from 'react';
import GoogleAccount from '@assets/homepage/GoogleAccount';
import FacebookAccount from '@assets/homepage/FacebookAccount';
import VkAccount from '@assets/homepage/VkAccount';
import styles from './styles.module.less';
import cn from 'classnames';

export const SocialNetworks = ({ variant }) => {
  return (
    <div
      className={cn(
        styles.wrapper,
        { [styles.offer]: variant === 'home_offer' },
        { [styles.end]: variant === 'home_end' },
      )}
    >
      <span className={styles.title}>Войти с помощью</span>
      <div
        className={cn(styles.icons, {
          [styles.icons_home]: variant === 'home_end' || variant === 'home_offer',
        })}
      >
        <a className={styles.iconWrapper} href="###">
          <GoogleAccount />
        </a>

        <a className={styles.iconWrapper} href="###">
          <FacebookAccount />
        </a>

        <a className={styles.iconWrapper} href="###">
          <VkAccount />
        </a>
      </div>
    </div>
  );
};
