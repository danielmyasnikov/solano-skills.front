import React, { createRef, useEffect, useState } from 'react';
import styles from './styles.module.less';
import Header from './headers/Header';
import HeaderExercise from './headers/ExerciseHeader';
import Sidebar from './Sidebar';
import { useRouteMatch } from 'react-router-dom';
import { sidebarPath } from '@src/sidebarPath';
import { FeedbackModal } from '../common/modals/feedback';

const Layout = ({ children, headerVariant }) => {
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const [showModalSubscription, setShowModalSubscription] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const match = useRouteMatch();
  const headerRef = createRef();

  const handleCloseModal = () => setShowModalSubscription(!showModalSubscription);

  const handleUpdateSubscription = () => setShowModalSubscription(true);

  useEffect(() => {
    setSidebarFixed(sidebarPath.includes(match.path));
  }, [match.path]);

  return (
    <>
      <div className={styles.wrapper}>
        {headerVariant === 'exercise' ? (
          <HeaderExercise
            headerRef={headerRef}
            onSupport={() => setFeedbackModalOpen(!feedbackModalOpen)}
          />
        ) : (
          <Header
            onCloseModal={handleCloseModal}
            isShowModal={showModalSubscription}
            headerRef={headerRef}
            onSupportReport={() => setFeedbackModalOpen(!feedbackModalOpen)}
          />
        )}
        <div className={styles.container}>
          <Sidebar
            headerTarget={headerRef}
            sidebarFixed={sidebarFixed}
            onUpdateSubscription={handleUpdateSubscription}
          />
          {children}
        </div>
      </div>
      {feedbackModalOpen && (
        <FeedbackModal onClose={() => setFeedbackModalOpen(!feedbackModalOpen)} />
      )}
    </>
  );
};

export default Layout;
