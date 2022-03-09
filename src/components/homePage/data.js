import googleAccount from '@assets/homepage/GoogleAccount';
import facebookAccount from '@assets/homepage/FacebookAccount';
import vkAccount from '@assets/homepage/VkAccount';
import tochki from '@assets/homepage/Tochki';
import lectures from '@assets/homepage/lectures.png';
import practice from '@assets/homepage/practice.png';
import statement from '@assets/homepage/statement.png';
import avatar from '@assets/homepage/avatar.png';

export const images = {
  googleAccount,
  facebookAccount,
  vkAccount,
  tochki,
  lectures,
  practice,
  statement,
  avatar,
};

export const slides = [
  {
    bg: 'blue',
    img: 'trophy',
    title: 'Профессии',
    subtitle: '4 профессии',
    btn: 'Смотреть все',
    btnlearn: 'Подготовиться к профессии',
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
      },
    ],
  },
  {
    bg: 'green',
    img: 'mathematics',
    title: 'Навыки',
    subtitle: '14 навыков',
    btn: 'Смотреть все',
    btnlearn: 'Получить навык',
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
      },
    ],
  },
  {
    bg: 'red',
    img: 'courses',
    title: 'Курсы',
    subtitle: '58 курсов',
    btn: 'Смотреть все',
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
      },
    ],
  },
];

export const practices = [
  {
    pretitle: 'Лекции',
    title: 'Пример видеоурока',
    text: 'Представляем пример видеоурока по обучению программирования на языке Python. Видео длится всего 5 минут. Наша цель - гарантировать результат обучения. Результат обучения - Вы становитесь сертифицированным, профессиональным разработчиком на Python.',
    link: 'Выбрать курс',
    route: '/',
    img: 'lectures',
    textblockTitle: 'Видео длится около 5 минут',
    textblockSubtitle: 'После этого вы приступаете к практике',
  },
  {
    pretitle: 'Практика',
    title: 'Функционал платформы обучения позволяет на практике проверить свои знания',
    text: 'Данный функционал позволяет проверить правильность написанного вами кода на Python. В верхнем окне вы пишите собственно код фрагмента программы. В нижнем окне - при нажатии кнопки “Выполнить код”, вы получаете результат выполнения кода, тем самым проверяя его правильность.',
    link: 'Начать практиковаться',
    route: '/',
    img: 'practice',
    textblockTitle: 'Не требует установки',
    textblockSubtitle: 'Запускайте код из браузера и обучайтесь',
  },
  {
    pretitle: 'Сертификация',
    title: 'После прохождения курсов вы получаете сертификат установленного образца',
    text: 'Данный сертификат актуален при трудоустройстве, и вы можете скачать его в PDF формате, что дает вам возможность для вычета НДФЛ',
    link: 'Перейти к обучению',
    route: '/',
    img: 'statement',
    textblockTitle: 'Актуален при трудоустройстве',
    textblockSubtitle: 'Просто предъявите его',
  },
];

export const feedbacks = [
  {
    avatar: 'avatar',
    author: 'Linh Nguyen',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”',
  },
  {
    avatar: 'avatar',
    author: 'Bernard Welch',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”',
  },
  {
    avatar: 'avatar',
    author: 'Linh Nguyen',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”',
  },
  {
    avatar: 'avatar',
    author: 'Bernard Welch',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”',
  },
  {
    avatar: 'avatar',
    author: 'Linh Nguyen',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”',
  },
  {
    avatar: 'avatar',
    author: 'Bernard Welch',
    text: '“Write is super-useful as we can see the actual text in the actual design. We can even adjust text length to make it look good!”',
  },
];
