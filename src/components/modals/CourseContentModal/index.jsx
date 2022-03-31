import styles from './styles.module.less';
import { CourseContent } from '../../common/CourseContent';
import { Modal } from '@mui/material';
import { useGetCourseQuery } from '@src/features/courses/courses.api';
import { useParams } from 'react-router';

const CourseContentModal = ({ onClose }) => {
  const { courseId } = useParams();

  const { data: course, loading, error } = useGetCourseQuery(courseId);

  if (loading || !course) {
    return null;
  }

  return (
    <Modal open onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <CourseContent onClose={onClose} parts={course.parts || []} slug={courseId} />
        </div>
      </div>
    </Modal>
  );
};

export default CourseContentModal;
