export const headerPageContent = {
  profile: {
    title: 'Личный кабинет',
    description:
      'Здесь вы можете просматривать информацию о себе, своих достижениях, историю обучения и обновлять свой тарифный план.',
  },
  settings: {
    title: 'Настройки профиля',
    description:
      'Здесь вы можете просматривать информацию о себе, своих достижениях, историю обучения и \tобновлять свой тарифный план.',
  },
};

export const settingsMenuContent = [
  { title: 'Подписка', svg: 'subscription', isActive: true },
  { title: 'Пароль', svg: 'password', isActive: false },
  { title: 'Уведомления', svg: 'notification', isActive: false },
  { title: 'Социальные сети', svg: 'social', isActive: false },
  { title: 'Удалить аккаунт', svg: 'delete', isActive: false },
];

export const notificationsItems = [
  {
    title: 'Онбординг',
    description: 'Советы и рекомендации, которые помогут вам начать обучение.',
    isActive: true,
  },
  {
    title: 'Информационные оповещения',
    description:
      'Будьте в курсе новых курсов, программ в режиме реального времени, функций продукта и всего важного, что происходит в solanoskills. (4 письма в месяц)',
    isActive: false,
  },
  {
    title: 'Улучшение обучения',
    description:
      'Получайте персонализированные сообщения, которые помогут улучшить ваш прогресс в обучении. (0-2 письма в месяц)',
    isActive: true,
  },
  {
    title: 'Специальные предложения',
    description: 'Будьте в курсе, когда будет акция solanoskills! (0-1 письмо в месяц)',
    isActive: true,
  },
];

export const socialItems = [
  {
    link: 'www.vk.com/youraccount',
    title: 'Вконтакте',
    isLinked: true,
  },
  {
    link: 'www.vk.com/youraccount',
    title: 'Google',
    isLinked: false,
  },
];
