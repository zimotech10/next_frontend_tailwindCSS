import createAxiosClient from '@/api/axiosClient';
import axiosClient from '@/api/axiosClient';
import { CookieRepository } from '@/storages/cookie/cookie-repository';
import axios from 'axios';

export const AuthService = {
  login: async ({ publicKey, signedMessage }: any) => {
    const axiosClient = await createAxiosClient();
    return axiosClient.post('/auth/login', {
      publicKey,
      signedMessage,
    });
  },
  getAuthMessage: async () => {
    const axiosClient = await createAxiosClient();
    return axiosClient.get('/auth/message');
  },
  refreshAccessToken: async () => {
    let refreshToken = CookieRepository.getRefreshToken();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/auth/refreshToken`,
        {
          refreshToken,
        }
      );

      if (response && response.data && response.data.accessToken) {
        CookieRepository.setAccessToken(response.data.accessToken);
        CookieRepository.setRefreshToken(response.data.refreshToken);

        return response.data.accessToken;
      }

      return '';
    } catch {
      console.error('unable to refresh access-token');
      return '';
    }
  },
};
