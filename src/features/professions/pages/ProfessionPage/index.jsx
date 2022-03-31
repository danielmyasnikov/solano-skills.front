import React, { useState } from 'react';
import { WrapHeader } from '@components/common/wrapHeader';
import { Redirect, useParams } from 'react-router';
import { ProfessionCertificateModal } from '@components/modals/professionCertificate';
import styles from './styles.module.less';
import { course } from './data.js';
import { useGetSkillQuery } from '@src/features/skills/skills.api';
import { Preloader } from '@components/mui/Preloader';
import { CourseList } from '@src/features/courses/pages/Course/courseList';
import { CourseSidebar } from '@src/features/courses/pages/Course/courseSidebar';

const ProfessionPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { professionId } = useParams();

  const modalHandler = () => setShowModal(!showModal);

  const { data: profession, error, isLoading } = useGetSkillQuery(professionId);

  if (error) {
    return <Redirect to={'/404'} />;
  }

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <WrapHeader variant={'profession'} info={profession.info} />
          <div className={styles.contentWrap}>
            <CourseList variant={'profession'} parts={profession.courses || []} />
            <CourseSidebar
              variant={'profession'}
              progress={profession?.progress}
              mentors={course.mentors}
              certificate={course.certificate}
              modalHandler={modalHandler}
            />
          </div>
        </>
      )}
      <ProfessionCertificateModal isOpen={showModal} modalHandler={modalHandler} />
    </div>
  );
};

export default ProfessionPage;
