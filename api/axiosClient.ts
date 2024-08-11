import { AuthService } from '@/services/auth-service';
import { CookieRepository } from '@/storages/cookie/cookie-repository';
import axios from 'axios';
import { redirect } from 'next/navigation';

const createAxiosClient = async () => {
  let accessToken = CookieRepository.getAccessToken();
  let refreshToken = CookieRepository.getRefreshToken();
  if (!accessToken && refreshToken) {
    await AuthService.refreshAccessToken()
      .then((res) => {
        accessToken = res;
        window.location.href = '/';
      })
      .catch((err) => console.log(err));
  }

  const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
    },
  });
  return axiosClient;
};

export default createAxiosClient;
