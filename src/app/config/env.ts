import { getEnv } from './env.utils';

export const env = {
  isProduction: getEnv('NODE_ENV') === 'production',
  port: getEnv('PORT') || 3000,

  api: {
    platform: getEnv('REACT_APP_API_COURSE', true),
    terminal: getEnv('REACT_APP_API_TERMINAL', true),
  },

  sentryDns: getEnv('REACT_APP_SENTRY_DSN'),

  seo: {
    siteName: getEnv('REACT_APP_SEO_SITE') || 'Core Site',
    author: getEnv('REACT_APP_SEO_AUTHOR') || 'Core Team',

    title: getEnv('REACT_APP_SEO_DEFAULT_TITLE') || 'Core Site',
    description: getEnv('REACT_APP_SEO_DEFAULT_DESCRIPTION') || 'Description',

    openGraph: {
      siteName: getEnv('REACT_APP_SEO_SITE') || 'Core Site',
      author: getEnv('REACT_APP_SEO_AUTHOR') || 'Core Team',
      verification: [
        {
          name: 'google-site-verification',
          token: 'REACT_APP_SEO_GOOGLE_VERIFICATION_TOKEN',
        },
        {
          name: 'yandex-verification',
          token: 'REACT_APP_SEO_YANDEX_VERIFICATION_TOKEN',
        },
      ],
      twitter: {
        site: getEnv('REACT_APP_SEO_SITE') || 'Core Site',
        creator: getEnv('REACT_APP_SEO_AUTHOR') || 'Core Team',
        image: '',
      },
      og: {
        site: getEnv('REACT_APP_SEO_SITE') || 'Core Site',
        // Recommended Image size: min 1200 x 630 px
        // Min Image size: 600 x 315 px, dont use a image below this size
        image: '',
        type: 'site',
      },
    },
  },

  frontendUrl: getEnv('REACT_APP_FRONTEND_URL') || `http://localhost:${getEnv('PORT') || 3000}`,

  analytics: {
    yandexTrackingId: Number(getEnv('REACT_APP_YANDEX_TRACKING_ID')),
    googleCheapId: getEnv('REACT_APP_GOOGLE_CHEAP_ID'),
    googleTrackingId: getEnv('REACT_APP_GOOGLE_TRACKING_ID'), // UA-XXXXX-X
  },
};
