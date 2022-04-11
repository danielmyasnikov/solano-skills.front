type NameToType = {
  readonly NODE_ENV?: 'production' | 'staging' | 'development' | 'test';

  readonly PORT?: string;

  readonly REACT_APP_API_URL: string;

  readonly REACT_APP_SENTRY_DSN?: string;

  readonly REACT_APP_SEO_SITE?: string;
  readonly REACT_APP_SEO_AUTHOR?: string;

  readonly REACT_APP_SEO_DEFAULT_TITLE?: string;
  readonly REACT_APP_SEO_DEFAULT_DESCRIPTION?: string;
  readonly REACT_APP_SEO_KEYWORDS?: string;

  readonly REACT_APP_SEO_GOOGLE_VERIFICATION_TOKEN?: string;
  readonly REACT_APP_SEO_YANDEX_VERIFICATION_TOKEN?: string;

  readonly REACT_APP_YANDEX_TRACKING_ID?: string;
  readonly REACT_APP_GOOGLE_CHEAP_ID?: string;
  readonly REACT_APP_GOOGLE_TRACKING_ID?: string;
};

export function getEnv<Env extends keyof NameToType>(
  name: Env,
  throwError?: boolean,
): NameToType[Env] | undefined;
export function getEnv(
  name: keyof NameToType,
  throwError = false,
): NameToType[keyof NameToType] | undefined {
  const val = process.env[name];

  if (throwError && !val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  return val;
}
