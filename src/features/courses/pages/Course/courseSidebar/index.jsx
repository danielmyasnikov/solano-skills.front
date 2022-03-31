import cn from 'classnames';
import ProgressBar from '@components/mui/ProgressBar';
import styles from './styles.module.less';
import AvatarDefault from '@assets/avatarDefault.png';
import mentor from '@assets/mentor.png';
import Dataset from '@assets/Dataset';
import CertificatesBlack from '@assets/CertificatesBlack.svg';

export const CourseSidebar = ({
  variant,
  tracks,
  datasets,
  coauthors,
  progress,
  mentors,
  certificate,
  modalHandler,
}) => {
  return (
    <div className={cn(styles.wrapper, styles[variant])}>
      {Object.keys(tracks || []).length > 0 && (
        <div className={cn(styles.courseTrackWrapper, styles.card)}>
          <span className={styles.description}>Этот курс является частью следующих треков:</span>
          <ul className={styles.courseTracks}>
            {tracks.map((item, i) => (
              <li key={item.title + i} className={styles.courseTrack}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(coauthors || []).length > 0 && (
        <div className={cn(styles.card, styles.collaboratorsWrapper)}>
          <span className={styles.title}>Совместно с:</span>
          <ul className={styles.datasets}>
            {datasets.map((item, i) => (
              <li key={item.title + i} className={styles.collaborator}>
                <img className={styles.image} src={AvatarDefault} />
                <span className={styles.name}>{`${item.first_name} ${item.last_name}`}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(datasets || []).length > 0 && (
        <div className={cn(styles.card, styles.datasetWrapper)}>
          <span className={styles.title}>Наборы данных</span>
          <ul className={styles.datasets}>
            {datasets.map((item, i) => (
              <li key={item.title + i} className={styles.dataset}>
                <Dataset />
                <span className={styles.name}>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/*{progress && (*/}
      {/*  <div className={cn(styles.card, styles.progressWrapper)}>*/}
      {/*    <div className={styles.progressWrapper__title}>Ваш прогресс</div>*/}
      {/*    <ProgressBar*/}
      {/*      value={progress}*/}
      {/*      height={'12px'}*/}
      {/*      variant={'skill'}*/}
      {/*      top={'15px'}*/}
      {/*      isShowValue*/}
      {/*    />*/}
      {/*    <div className={styles.progressWrapper__stats}>*/}
      {/*      <div className={styles.progressWrapper__stat}>1 пройден</div>*/}
      {/*      <div className={styles.progressWrapper__stat}>1 в прогрессе</div>*/}
      {/*      <div className={styles.progressWrapper__stat}>3 осталось</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
      {certificate && (
        <div className={styles.certificateWrapper}>
          <div className={styles.certificateWrapper__title}>
            <img src={CertificatesBlack} alt="@" />
            <span>Зачем нужен сертификат?</span>
          </div>
          <div className={styles.certificateWrapper__subtitle}>
            Официальный документ гос. образца, подтверждающий вашу компетентность.
          </div>
          <div className={styles.certificateWrapper__more} onClick={() => modalHandler()}>
            Узнать больше
          </div>
        </div>
      )}
      {mentors && (
        <div className={cn(styles.card, styles.mentorsWrapper)}>
          <div className={styles.mentorsWrapper__title}>Инструкторы: </div>
          <div className={styles.mentorsWrapper__mentors}>
            {mentors.map((name, i) => (
              <div key={i} className={styles.mentorsWrapper__mentor}>
                <img src={mentor} alt="Фото" />
                <div className={styles.mentorsWrapper__mentor__name}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
