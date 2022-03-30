import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import FooterLogo from '@assets/homepage/FooterLogo';
import styles from './styles.module.less';
import { links, otherLinks, info } from './data';

const Footer = () => {
  const renderMenu = () => {
    return links.map(({ title, style, link, items }) => (
      <div className={cn(styles.colomn, styles[style])}>
        <Link to={link}>
          <h5 className={styles.colomn__title}>{title}</h5>
        </Link>
        {items.map(({ text, link }) => (
          <React.Fragment key={text}>
            {text === 'Стать преподавателем' ? (
              <p className={styles.link}>
                <a href="https://forms.gle/nCKa2D3JK756E9eg7" target="_blank">
                  {text}
                </a>
              </p>
            ) : (
              <Link to={link}>
                <p className={styles.link}>{text}</p>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    ));
  };

  const renderInfo = (arr) =>
    arr.map(({ text, link }) => (
      <p key={text}>
        <a href={link} target={'_blank'}>
          {text}
        </a>
      </p>
    ));

  return (
    <div className={styles.footer}>
      <div className={cn(styles.block, styles.block_blue)}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.logo}>
              <FooterLogo />
              <span>support@deepskills.ru</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.menu}>{renderMenu()}</div>
            <div className={styles.info}>
              <div>{renderInfo(otherLinks)}</div>
              <div>{renderInfo(info)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
