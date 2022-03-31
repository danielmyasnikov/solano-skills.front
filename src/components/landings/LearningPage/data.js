import googleAccount from '@assets/homepage/GoogleAccount';
import facebookAccount from '@assets/homepage/FacebookAccount';
import vkAccount from '@assets/homepage/VkAccount';
import tochki from '@assets/homepage/Tochki';
import lectures from '@assets/homepage/lectures.png';
import practice from '@assets/homepage/practice.png';
import statement from '@assets/homepage/statement.png';
import avatar1 from '@assets/homepage/avatar1.png';
import avatar2 from '@assets/homepage/avatar2.png';
import avatar3 from '@assets/homepage/avatar3.png';
import avatar4 from '@assets/homepage/avatar4.png';
import avatar5 from '@assets/homepage/avatar5.png';
import avatar6 from '@assets/homepage/avatar6.png';

export const images = {
  googleAccount,
  facebookAccount,
  vkAccount,
  tochki,
  lectures,
  practice,
  statement,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
};

export const slides = [
  /*
      {
    bg: 'blue',
    img: 'trophy',
    title: 'Профессии',
    subtitle: '4 профессии',
    link: '/professions',
    btn: 'Смотреть все',
    btnlearn: 'Подготовиться к профессии',
    items: [
      {
        bg: 'slideBg',
        title: 'Python программист',
        link: '/professions/python-programmer',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Исскуственный интелект',
        link: '/professions/machine-learning',
        text: 'Овладейте необходимыми навыками, чтобы получить работу ученого в области машинного обучения! Вы расширите свой набор навыков программирования на Python с помощью набора инструментов для выполнения глубокого обучения.',
      },
      {
        bg: 'slideBg',
        title: 'Data Scientist',
        link: '/professions/data-scientist',
        text: 'В этом курсе вы узнаете, как этот универсальный язык позволяет импортировать, очищать, обрабатывать и визуализировать данные — все это неотъемлемые навыки для любого начинающего специалиста по обработке данных или исследователя.',
      },
      {
        bg: 'slideBg',
        title: 'Аналитик данных',
        link: '/professions/data-analyst',
        text: 'Приобретите навыки построения карьеры на Python, необходимые вам для успеха в качестве аналитика данных. Никакого опыта программирования не требуется.',
      },
    ],
  },
   */
  /*
  {
    bg: 'green',
    img: 'mathematics',
    title: 'Навыки',
    subtitle: '14 навыков',
    link: '/skills',
    btn: 'Смотреть все',
    btnlearn: 'Получить навык',
    items: [
      {
        bg: 'slideBg',
        title: 'Разработка на Python',
        link: '/skills/python-developing',
        text: 'Этот навык научит программировать вас. Вы начнете с изучения того, как использовать встроенные модули и функции для эффективной оптимизации вашего кода.',
      },
      {
        bg: 'slideBg',
        title: 'Импортирование данных',
        link: '/skills/data-importing',
        text: 'Понимание того, как подготовить ваши данные, является важным навыком для работы на Python. Это то, что вы должны сделать, прежде чем сможете раскрыть важные идеи.',
      },
      {
        bg: 'slideBg',
        title: 'Изменение данных',
        link: '/skills/data-manipulation',
        text: 'В этом треке вы узнаете, как манипулировать данными, писать эффективный код Python и работать со сложными данными, включая данные о дате и времени, текстовые данные и веб-данные, используя API.',
      },
      {
        bg: 'slideBg',
        title: 'Основы машинного обучения',
        link: '/skills/machine-learning-fundamentals-with-python',
        text: 'Машинное обучение меняет мир, и если вы хотите стать частью революции ML, это отличное место для начала! В этом треке вы познакомитесь с фундаментальными концепциями машинного обучения.',
      },
    ],
  }
 */
  {
    bg: 'red',
    img: 'courses',
    title: 'Курсы',
    subtitle: '15 курсов',
    link: '/courses',
    btn: 'Смотреть все',
    btnlearn: 'Изучить курс',
    items: [
      {
        bg: 'slideBg',
        title: 'Обработка данных с помощью pandas',
        link: '/courses/manipulating-data-with-pandas/',
        text: 'Pandas - самая популярная в мире библиотека Python для обработки и анализа данных. Учимся выбирать, фильтровать и преобразовывать данные',
      },
      {
        bg: 'slideBg',
        title: 'Инструменты Python II',
        link: '/courses/python-toolbox-2',
        text: 'Изучаем инструменты Python. Итераторы, генераторы списков',
      },
      {
        bg: 'slideBg',
        title: 'Регулярные выражения Python',
        link: '/courses/regular-expressions',
        text: 'Вы узнаете, как разбивать строки, соединять их вместе, интерполировать, а также искать, извлекать, заменять и сопоставлять строки с помощью регулярных выражений',
      },
      {
        bg: 'slideBg',
        title: 'Разработка ПО на Python',
        link: '/courses/software-engineering-for-data-scientists-in-python',
        text: 'В этом курсе вы узнаете все о таких важных понятиях, как модульность, документация и автоматизированное тестирование, а также увидите, как они могут помочь вам решать задачи Data Science',
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
    route: '/courses',
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
    route: '/courses',
    img: 'statement',
    textblockTitle: 'Актуален при трудоустройстве',
    textblockSubtitle: 'Просто предъявите его',
  },
];

export const feedbacks = [
  {
    avatar: 'avatar1',
    author: 'Елена Ворончук',
    text: '“Эта программа — настоящая революция в высшем образовании.”',
  },
  {
    avatar: 'avatar2',
    author: 'Артем Шабалов',
    text: '“Я начал с нуля и смог учиться онлайн и в итоге накопил достаточно знаний и навыков, чтобы найти новую, хорошо оплачиваемую работу.”',
  },
  {
    avatar: 'avatar3',
    author: 'Ольга Белякова',
    text: '“Специалисты по подбору кадров обратили внимание на профессиональный сертификат в моем профиле LinkedIn. На собеседовании они сказали, что полученные мной навыки впечатляют. Меня приняли на работу”',
  },
  {
    avatar: 'avatar4',
    author: 'Андрей Николаев',
    text: '“Прекрасная платформа для обучения и развития новым навыкам и профессиям, удобный формат”',
  },
  {
    avatar: 'avatar5',
    author: 'Вероника Крупских',
    text: '“Решила попробовать для себя что-то новое, благодаря данным курсам ушла с работы и теперь работаю дома в свое удовольствие”',
  },
  {
    avatar: 'avatar6',
    author: 'Иван Носков',
    text: '“Раньше думал, что 35т.р. - потолок в моем городе. Ошибься, спасибо deepskills!!!”',
  },
];
