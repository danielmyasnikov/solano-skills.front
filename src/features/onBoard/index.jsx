import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { selectTracks } from './store/selector';
import { selectIsAuth } from '@store/profile/selector';

import useDebounce from '../../components/hooks/useDebounce';

import { Course } from './course';
import Input from '@components/mui/inputSearch';
import Button from '@components/mui/button';
import { WelcomeCourse } from '../../components/common/modals/welcomeCourse';
import { Preloader } from '../../components/mui/preloader';

import logo from './assets/Logo.svg';
import logoModal from './assets/LogoModal.svg';

import styles from './styles.module.less';
import { addTracks, getTracks, searchTracks } from './store/actions';
import { hideTracksModal } from './store/slice';

export const OnBoardPage = () => {
  const [searchCourse, setSearchCourse] = useState('');
  const [checkedCourseList, setCheckedCourseList] = useState([]);

  const dispatch = useDispatch();

  const trackInfo = useSelector(selectTracks);
  const isAuth = useSelector(selectIsAuth);

  const showModalHandler = () => {
    console.log(checkedCourseList);
    dispatch(addTracks({ tracks: checkedCourseList }));
  };

  const handleSearch = (e) => setSearchCourse(e.target.value);

  const debouncedResults = useDebounce(handleSearch, 300);

  const handleChecked = (id) => setCheckedCourseList([...checkedCourseList, id]);

  const handleRemoveChecked = (id) =>
    setCheckedCourseList(checkedCourseList.filter((item) => item !== id));

  useEffect(() => dispatch(searchTracks({ value: searchCourse })), [searchCourse]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getTracks());
    }
  }, [isAuth]);

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
        </div>
      </div>
      <div className={styles.footer}>
        {(checkedCourseList.length && (
          <Button variant="containedWhite" onClick={showModalHandler}>
            Начать обучение
          </Button>
        )) || (
          <div className={styles.skip}>
            <span>
              Вы можете&nbsp;
              <Link to="/courses" className={styles.activeLink}>
                пропустить
              </Link>
              <span>опрос и&nbsp;</span>
            </span>
            <span>перейти сразу к курсам</span>
          </div>
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
