import { useCallback, useEffect, useState } from 'react';

import { Course } from './course';
import { CoursesList } from './constants';
import Input from '@components/mui/inputSearch';
import ellipse from './assets/Ellipse.svg';
import logo from './assets/Logo.svg';
import logoModal from './assets/LogoModal.svg';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import useDebounce from '../hooks/useDebounce';
import { WelcomeCourse } from '../common/modals/welcomeCourse';

export const OnBoardPage = () => {
  const [list, setList] = useState(CoursesList);
  const [searchCourse, setSearchCourse] = useState('');
  const [checkedCourseList, setCheckedCourseList] = useState([]);
  const [showButtonGoStudy, setShowButtonGoStudy] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => setShowModal(!showModal);

  const handleSearch = (e) => setSearchCourse(e.target.value);

  const debouncedResults = useDebounce(handleSearch, 300);

  const handleChecked = (id) => setCheckedCourseList([...checkedCourseList, id]);

  const handleRemoveChecked = (id) =>
    setCheckedCourseList(checkedCourseList.filter((item) => item !== id));

  const isShowButton = useCallback(() => {
    list.forEach((item) => {
      checkedCourseList.forEach((id) => {
        if (item.item_id === id && item.isDevelopment) {
          setShowButtonGoStudy(false);
        } else if (item.item_id === id && !item.isDevelopment) {
          setShowButtonGoStudy(true);
        }
      });
    });
  }, [checkedCourseList, list]);

  const renderCourseList = () => {
    return list.map(({ item_id, title, description, isDevelopment }) => (
      <div key={item_id} className={styles.item}>
        <Course
          id={item_id}
          title={title}
          description={description}
          isDevelopment={isDevelopment}
          handleСhoice={handleChecked}
          handleRemoveChoice={handleRemoveChecked}
        />
      </div>
    ));
  };

  useEffect(() => {
    if (searchCourse !== '') {
      const courseItems = CoursesList.filter((course) => course.title.includes(searchCourse));
      setList(courseItems);
    } else {
      setList(CoursesList);
    }
  }, [searchCourse]);

  useEffect(() => {
    isShowButton();
  }, [checkedCourseList, isShowButton]);

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
            {(list.length && <span>С какого курса вы бы хотели начать свое обучение?</span>) || (
              <span>По вашему запросу мы ничего не нашли.</span>
            )}
          </div>
          <div className={styles.mainCourses}>{renderCourseList()}</div>
          <div className={styles.mainRecomendation}>
            <div className={styles.mainRecomendationQuestion}>
              <img src={ellipse} alt="ellipse" />
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
            <span className={styles.activeLink}>пропустить</span>
            <span>опрос и перейти сразу к курсам</span>
          </>
        )}
      </div>
      <WelcomeCourse logo={logoModal} open={showModal} handleClick={showModalHandler} />
    </>
  );
};
