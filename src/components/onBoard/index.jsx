import { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import * as AuthStore from '@store/auth';
import { addTracks, getTracks, hideTracksModal, searchTracks } from '@store/onBoard/actions';
import { selectTracks } from '@store/onBoard/selector';

import useDebounce from '../hooks/useDebounce';

import { Course } from './course';
import Input from '@components/mui/inputSearch';
import Button from '@components/mui/button';
import { WelcomeCourse } from '../common/modals/welcomeCourse';
import { Preloader } from '../mui/preloader';

import logo from './assets/Logo.svg';
import logoModal from './assets/LogoModal.svg';

import styles from './styles.module.less';

export const OnBoardPage = () => {
  const [searchCourse, setSearchCourse] = useState('');
  const [checkedCourseList, setCheckedCourseList] = useState([]);
  const [showButtonGoStudy, setShowButtonGoStudy] = useState(false);
  const [authCounter, setAuthCounter] = useState(0);

  const dispatch = useDispatch();

  const trackInfo = useSelector(selectTracks);
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const showModalHandler = () => dispatch(addTracks(checkedCourseList, { headers }));

  const handleSearch = (e) => setSearchCourse(e.target.value);

  const debouncedResults = useDebounce(handleSearch, 300);

  const handleChecked = (id) => setCheckedCourseList([...checkedCourseList, id]);

  const handleRemoveChecked = (id) =>
    setCheckedCourseList(checkedCourseList.filter((item) => item !== id));

  const isShowButton = useCallback(() => {
    if (trackInfo.trackList) {
      let newArr = [];
      trackInfo.trackList.forEach((item) => {
        checkedCourseList.forEach((id) => {
          if (item.item_id === id) {
            newArr.push(item);
          }
        });
      });
      newArr = newArr.filter((item) => item.is_development);
      newArr.length ? setShowButtonGoStudy(false) : setShowButtonGoStudy(true);
    }
  }, [checkedCourseList]);

  useEffect(() => dispatch(searchTracks(searchCourse, { headers })), [searchCourse]);

  useEffect(() => isShowButton(), [checkedCourseList]);

  useEffect(() => setAuthCounter(authCounter + 1), [headers]);

  useEffect(() => {
    if (authCounter >= 1 && headers.hasOwnProperty('uid')) {
      dispatch(getTracks({ headers }));
    }
  }, [authCounter]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img className={styles.headerLogo} src={logo} alt="logo" />
          <span className={styles.headerTitle}>Добро пожаловать в DeepSkills</span>
        </div>
        <div className={styles.main}>
          <div className={styles.mainSearch}>
            <Input
              value={searchCourse}
              onChange={debouncedResults}
              placeholder="Введите название курса, который вы ищете"
            />
          </div>
          <div className={styles.mainQuestion}>
            {(trackInfo.trackList && trackInfo.trackList.length && (
              <span>С какого курса вы бы хотели начать свое обучение?</span>
            )) || <span>По вашему запросу мы ничего не нашли.</span>}
          </div>
          {(trackInfo.trackList && (
            <div className={styles.mainCourses}>
              {trackInfo.trackList.map(({ id, title, description, is_development }) => (
                <div key={id} className={styles.item}>
                  <Course
                    id={id}
                    title={title}
                    description={description}
                    isDevelopment={is_development}
                    handleСhoice={handleChecked}
                    handleRemoveChoice={handleRemoveChecked}
                  />
                </div>
              ))}
            </div>
          )) || (
            <div className={styles.preloaderContainer}>
              <Preloader color="#dfdfdf" size="60px" />
            </div>
          )}
          <div className={styles.mainRecomendation}>
            <div className={styles.mainRecomendationQuestion}>
              <span className={styles.mainRecomendationQuestionSymbol}>?</span>
            </div>
            <span>Не уверены какой курс выбрать? Попробуйте прочитать</span>
            <span className={`${styles.activeLink} ${styles.activeLinkMain}`}>Рекомендации</span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        {(showButtonGoStudy && checkedCourseList.length && (
          <Button variant="containedWhite" onClick={showModalHandler}>
            Начать обучение
          </Button>
        )) || (
          <>
            <span>Вы можете</span>
            <Link className={styles.activeLink}>пропустить</Link>
            <span>опрос и перейти сразу к курсам</span>
          </>
        )}
      </div>
      <WelcomeCourse
        logo={logoModal}
        open={trackInfo.isShowWelcomeModal}
        handleClick={() => dispatch(hideTracksModal())}
      />
    </>
  );
};
