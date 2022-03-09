import Progress from '@assets/Progress';
import Bookmarks from '@assets/Bookmarks';
import Professions from '@assets/Professions';
import Skills from '@assets/Skills';
import Courses from '@assets/Courses';
import Certificates from '@assets/Certificates';
import Practice from '@assets/Practice';
import Projects from '@assets/Projects';
import Testing from '@assets/Testing';
import Groups from '@assets/Groups';
import Webinars from '@assets/Webinars';

export const profileItems = [
  { label: 'Прогресс', icon: <Progress />, link: '/progress' },
  { label: 'Закладки', icon: <Bookmarks />, link: '/courses3' },
  { label: 'Профессии', icon: <Professions />, link: '/courses2' },
  { label: 'Навыки', icon: <Skills />, link: '/skills' },
  { label: 'Курсы', icon: <Courses />, link: '/courses' },
  { label: 'Сертификаты', icon: <Certificates />, link: '/certificates' },
];

export const studyItems = [
  { label: 'Практика', icon: <Practice />, link: '/courses5' },
  { label: 'Проекты', icon: <Projects />, link: '/courses6' },
  { label: 'Тестирование', icon: <Testing />, link: '/courses7' },
  { label: 'Группы', icon: <Groups />, link: '/courses8' },
  { label: 'Вебинары', icon: <Webinars />, link: '/courses9' },
];
