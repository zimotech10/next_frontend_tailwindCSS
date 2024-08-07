import { jwtDecode } from 'jwt-decode';
import { CookieStorage } from './cookie';

const getMaxAgeFromSeconds = (sec: number) => {
  const currentDateInSeconds = Math.floor(Date.now() / 1000);
  const maxAge = sec - currentDateInSeconds;

  return maxAge;
};

export const CookieRepository = {
  getRefreshToken: () => {
    return CookieStorage.get('refreshToken') || '';
  },
  getAccessToken: () => {
    return CookieStorage.get('accessToken') || '';
  },
  removeRefreshToken: () => {
    CookieStorage.remove('refreshToken');
  },
  removeAccessToken: () => {
    CookieStorage.remove('accessToken');
  },
  setRefreshToken: (refreshToken: string) => {
    const { exp } = jwtDecode(refreshToken);
    CookieStorage.set('refreshToken', refreshToken, { maxAge: getMaxAgeFromSeconds(exp!) });
  },
  setAccessToken: (accessToken: string) => {
    const { exp } = jwtDecode(accessToken);
    CookieStorage.set('accessToken', accessToken, { maxAge: getMaxAgeFromSeconds(exp!) });
  },
};
