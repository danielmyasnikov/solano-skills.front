import css from './styles.module.less';
import { Link } from 'react-router-dom';
import TimerOutlined from '@assets/TimerOutlined.png';
import AvatarDefault from '@assets/avatarDefault.png';
import Py from '@assets/py.png';
import { numberDeclension } from '@components/common/helpers/numberDeclension';
import { Button } from '@mui/material';
import cn from 'classnames';

export const CourseCard = ({ info }) => {
  const getTypeImg = () => {
    switch (info.lang) {
      case 'python':
        return Py;
      default:
        break;
    }
  };

  const status = info.status;
  const author = info.instructor;
  const difficulty = info.difficulty;

  return (
    <Link className={css.wrapper} to={`/courses/${info.slug}`}>
      <div className={css.about}>
        <div className={css.header}>
          <img className={css.langImg} src={getTypeImg()} alt="Язык" />
          {difficulty && (
            <span className={cn(css.difficulty, css[difficulty])}>
              {difficulty === 'easy'
                ? 'Начинающим'
                : difficulty === 'medium'
                ? 'Продолжающим'
                : difficulty === 'hard'
                ? 'Экспертам'
                : difficulty}
            </span>
          )}
        </div>
        <h2 className={css.title}>{info.title}</h2>
        <span className={css.description} dangerouslySetInnerHTML={{ __html: info?.description }} />
        <div className={css.time}>
          <img className={css.timeIcon} src={TimerOutlined} alt="Время" />
          {`${info.time} ${numberDeclension(info.time, ['час', 'часа', 'часов'])}`}
        </div>
      </div>
      <div className={css.actionBlock}>
        {status === 'in_progress' || status === 'done' ? (
          <Button variant="outlinePurple">
            {status === 'in_progress' ? 'Продолжить курс' : 'Пройти заново курс'}{' '}
          </Button>
        ) : (
          <div className={css.author}>
            <img src={author?.avatar_url || AvatarDefault} className={css.avatar} alt="" />
            <div className={css.infoWrap}>
              <h4 className={css.authorTitle}>{`${author.first_name} ${author.last_name}`}</h4>
              <p className={css.text} dangerouslySetInnerHTML={{ __html: author?.subtitle }} />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
