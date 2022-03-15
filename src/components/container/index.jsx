import React, { createRef, useEffect, useState } from 'react';
import styles from './styles.module.less';
import Header from '@components/header';
import HeaderExercise from '@components/headerExercise';
import { useRouteMatch } from 'react-router-dom';
import { sidebarPath } from '../../sidebarPath';
import Sidebar from '@components/mui/sidebar';
import { FeedbackModal } from '../common/modals/feedback';

const Container = ({ Component, headerVariant }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const [showModalSubscription, setShowModalSubscription] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const match = useRouteMatch();
  const headerRef = createRef();

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseModal = () => setShowModalSubscription(!showModalSubscription);

  const handleUpdateSubscription = () => setShowModalSubscription(true);

  useEffect(() => {
    if (sidebarPath.includes(match.path)) {
      setSidebarFixed(true);
    } else {
      setSidebarFixed(false);
    }
  }, [match.path]);

  return (
    <>
      <div className={styles.wrapper}>
        {headerVariant === 'exercise' ? (
          <HeaderExercise
            headerRef={headerRef}
            handleSidebar={handleSidebar}
            onSupport={() => setFeedbackModalOpen(!feedbackModalOpen)}
          />
        ) : (
          <Header
            onCloseModal={handleCloseModal}
            isShowModal={showModalSubscription}
            headerRef={headerRef}
            handleSidebar={handleSidebar}
            onSupportReport={() => setFeedbackModalOpen(!feedbackModalOpen)}
          />
        )}
        <div className={styles.container}>
          <Sidebar
            closeSidebar={closeSidebar}
            openSidebar={openSidebar}
            headerTarget={headerRef}
            isSidebarOpen={isSidebarOpen}
            sidebarFixed={sidebarFixed}
            onUpdateSubscription={handleUpdateSubscription}
          />
          <Component />
        </div>
      </div>
      {feedbackModalOpen && (
        <FeedbackModal onClose={() => setFeedbackModalOpen(!feedbackModalOpen)} />
      )}
    </>
  );
};

export default Container;
