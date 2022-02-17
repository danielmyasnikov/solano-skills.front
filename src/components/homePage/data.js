import googleAccount from '@assets/homepage/GoogleAccount';
import facebookAccount from '@assets/homepage/FacebookAccount';
import groupOne from '@assets/homepage/GroupOne';
import groupTwo from '@assets/homepage/GroupTwo';
import slideBg from '@assets/homepage/slideBg';
import whatLeft from '@assets/homepage/WhatLeft';
import whatCenter from '@assets/homepage/WhatCenter';
import whatRight from '@assets/homepage/WhatRight';
import join from '@assets/homepage/Join';
import tochki from '@assets/homepage/Tochki';
import sloganLeft from '@assets/homepage/SloganLeft';
import sloganRight from '@assets/homepage/SloganRight';
import signUp from '@assets/homepage/SignUp';
import lectures from '@assets/homepage/lectures.png';
import practice from '@assets/homepage/practice.png';
import statement from '@assets/homepage/statement.png';
import mathematics from '@assets/homepage/mathematics.png';
import trophy from '@assets/homepage/trophy.png';
import courses from '@assets/homepage/courses.png';
import avatar from '@assets/homepage/avatar.png';

export const images = {
  googleAccount,
  facebookAccount,
  groupOne,
  groupTwo,
  slideBg,
  whatLeft,
  whatCenter,
  whatRight,
  join,
  tochki,
  sloganLeft,
  sloganRight,
  signUp,
  lectures,
  practice,
  statement,
  mathematics,
  trophy,
  courses,
  avatar
}

export const slides = [
  {
    bg: 'blue',
    img: 'trophy',
    title: 'Профессии',
    subtitle: '23 профессии',
    btn: 'Смотреть все >',
    btnlearn: 'Изучить курс',
    items: [
      {
        bg: 'slideBg',
        title: 'Python программист',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Исскуственный интелект',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Data Scientist',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Python программист',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      }
    ]
  },
  {
    bg: 'red',
    img: 'courses',
    title: 'Курсы',
    subtitle: '23 профессии',
    btn: 'Смотреть все >',
    btnlearn: 'Изучить курс',
    items: [
      {
        bg: 'slideBg',
        title: 'Введение в Python',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Введение в SQL',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Введение в R',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Python программист',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      }
    ]
  },
  {
    bg: 'green',
    img: 'mathematics',
    title: 'Навыки',
    subtitle: '23 профессии',
    btn: 'Смотреть все >',
    btnlearn: 'Изучить курс',
    items: [
      {
        bg: 'slideBg',
        title: 'Разработка на Python',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Импортирование данных',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Изменение данных',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Python программист',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      }
    ]
  }
]

export const practices = [
  {
    pretitle: 'Лекции',
    title: 'Короткие обучающие видео с максимальной пользой для обучения',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    link: 'Выбрать курс >>',
    route: '/',
    img: 'lectures',
    textblockTitle:'Видео длится около 5 минут',
    textblockSubtitle:'После этого вы приступаете к практике',
  },
  {
    pretitle: 'Практика',
    title: 'Практикуйтесь и применяйте свои навыки',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    link: 'Начать практиковаться >>',
    route: '/',
    img: 'practice',
    textblockTitle:'Не требует установки',
    textblockSubtitle:'Запускайте код из браузера и обучайтесь',
  },
  {
    pretitle: 'Сертификация',
    title: 'После прохождения курсов вы получаете сертификат установленного образца',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    link: 'Перейти к обучению >>',
    route: '/',
    img: 'statement',
    textblockTitle:'Актуален при трудоустройстве',
    textblockSubtitle:'Просто предъявите его',
  },
]

export const feedbacks = [
  {
    avatar: 'avatar',
    author: 'Linh Nguyen',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”'
  },
  {
    avatar: 'avatar',
    author: 'Bernard Welch',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”'
  },
  {
    avatar: 'avatar',
    author: 'Linh Nguyen',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”'
  },
  {
    avatar: 'avatar',
    author: 'Bernard Welch',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”'
  },
  {
    avatar: 'avatar',
    author: 'Linh Nguyen',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”'
  },
  {
    avatar: 'avatar',
    author: 'Bernard Welch',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”'
  }
]