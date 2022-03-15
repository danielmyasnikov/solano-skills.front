import React, { useState } from 'react';
import { WrapHeader } from '../common/wrapHeader';
import { CourseList } from '../coursePage/courseList';
import { CourseSidebar } from '../coursePage/courseSidebar';
import { ProfessionCertificateModal } from '@components/common/modals/professionCertificate';
import styles from './styles.module.less';
import { course } from './data'

export const ProfessionPage = () => {
  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => setShowModal(!showModal);

  

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
