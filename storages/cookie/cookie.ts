interface CookieOptions {
  maxAge?: number;
  domain?: string;
  path?: string;
}

const parseCookies = () => {
  if (typeof document === 'undefined') {
    return {};
  }
  return document.cookie
    .split(';')
    .filter((item) => item)
    .reduce(
      (cookies, next) => {
        const [key, value] = next.split('=');

        if (key && key?.trim() && value) {
          Object.assign(cookies, { [key?.trim()]: value?.trim() });
        }

        return cookies;
      },
      {} as { [key: string]: string }
    );
};

export const CookieStorage = {
  get: (key: string) => {
    const cookies = parseCookies();

    return cookies[key] || '';
  },
  set: (key: string, value: string | number, options: CookieOptions) => {
    if (options.path === undefined) {
      options.path = '/';
    }

    const cookieOptions = Object.keys(options).reduce((array, optionKey) => {
      const optionValue = options[optionKey as keyof CookieOptions];

      if (optionKey === 'maxAge') {
        array.push(`max-age=${optionValue}`);
      } else {
        array.push(`${optionKey}=${optionValue}`);
      }

      return array;
    }, [] as string[]);

    document.cookie = `${key}=${value.toString()};${cookieOptions.join('; ')}`;
  },
  remove: (key: string, options: CookieOptions = {}) => {
    options.maxAge = 0;
    CookieStorage.set(key, '', options);
  }
};
