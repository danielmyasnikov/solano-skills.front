import { Redirect, useParams } from 'react-router';
import { WrapHeader } from '@components/common/wrapHeader';
import styles from './styles.module.less';
import { course } from './data.js';
import { useGetSkillQuery } from '@src/features/skills/skills.api';
import { Preloader } from '@components/mui/Preloader';
import { CourseList } from '@src/features/courses/pages/Course/courseList';
import { CourseSidebar } from '@src/features/courses/pages/Course/courseSidebar';

const SkillPage = () => {
  const { skillId } = useParams();

  const { data: skill, error, isLoading } = useGetSkillQuery(skillId);

  if (error) {
    return <Redirect to={'/404'} />;
  }

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <WrapHeader variant={'skill'} info={skill.info} />
          <div className={styles.contentWrap}>
            <CourseList variant={'skill'} parts={skill.courses || []} />
            <CourseSidebar
              variant={'skill'}
              progress={skill.info.progress}
              mentors={course.mentors}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SkillPage;
