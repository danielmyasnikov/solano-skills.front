import React, { useState, useEffect } from 'react';
import { WrapHeader } from '../common/wrapHeader';
import { useSelector } from 'react-redux';
import * as AuthStore from '@store/auth';
import { getProfession } from '@store/api/professions';
import { useParams } from 'react-router';
import { CourseList } from '../coursePage/courseList';
import { CourseSidebar } from '../coursePage/courseSidebar';
import { ProfessionCertificateModal } from '@components/common/modals/professionCertificate';
import styles from './styles.module.less';
import { course } from './data';

export const ProfessionPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [profession, setProfession] = useState({});
  const { professionId } = useParams();
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const modalHandler = () => setShowModal(!showModal);

  const asyncGetProfession = async () => {
    const data = await getProfession(professionId, headers);
    setProfession(data);
  };

  useEffect(() => {
    asyncGetProfession();
    console.log(profession);
  }, []);

  return (
    <div className={styles.wrapper}>
      <WrapHeader variant={'profession'} />
      <div className={styles.contentWrap}>
        <CourseList variant={'profession'} parts={course.parts || []} />
        <CourseSidebar
          variant={'profession'}
          progress={course.progress}
          mentors={course.mentors}
          certificate={course.certificate}
          modalHandler={modalHandler}
        />
      </div>
      <ProfessionCertificateModal isOpen={showModal} modalHandler={modalHandler} />
    </div>
  );
};
