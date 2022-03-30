import React, { createRef, useEffect, useState } from 'react';
import styles from './styles.module.less';
import Header from './headers/Header';
import HeaderExercise from './headers/ExerciseHeader';
import Sidebar from './Sidebar';
import { useRouteMatch } from 'react-router-dom';
import { sidebarPath } from '@src/sidebarPath';
import { FeedbackModal } from '../common/modals/feedback';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectSidebar } from '@store/global/layout.selectors';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    overflowY: 'auto',
    background: '#F0F0F0',
    padding: `0 ${theme.spacing(3)}`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: '250px',
    }),
  }),
);

const Layout = ({ children, headerVariant }) => {
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const [showModalSubscription, setShowModalSubscription] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const match = useRouteMatch();
  const headerRef = createRef();
  const sidebarOpen = useSelector(selectSidebar);

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
        <Sidebar
          headerTarget={headerRef}
          sidebarFixed={sidebarFixed}
          onUpdateSubscription={handleUpdateSubscription}
        />

        <Main open={sidebarOpen}>{children}</Main>
      </div>
      {feedbackModalOpen && (
        <FeedbackModal onClose={() => setFeedbackModalOpen(!feedbackModalOpen)} />
      )}
    </>
  );
};

export default Layout;
