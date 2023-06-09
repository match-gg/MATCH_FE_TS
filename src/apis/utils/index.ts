import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import store from 'store/index';

const axiosInstance = (url: string) => {
  const instance = axios.create({ baseURL: url });
  return instance;
};

const axiosInstanceWithAuth = (url: string) => {
  const instance = axios.create({
    baseURL: url,
  });
  interceptors(instance);
  return instance;
};

// authAxios 요청 시점에 토큰을 헤더에 추가하기 위한 인터셉터
export const interceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const { accessToken } = store.getState().token;
      const refreshToken = localStorage.getItem('matchGG_refreshToken');

      (config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${accessToken}`,
      );
      (config.headers as AxiosHeaders).set('Refresh-Token', refreshToken);

      return config;
    },
    (error) => Promise.reject(error.response),
  );
  return instance;
};

const axiosKakaoInstance = (url: string) => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_REST_API_KEY,
      // redirect_uri  - login or register
      // code - 카카오 인가코드
    },
  });
  return instance;
};

export const defaultAxios = axiosInstance(
  process.env.REACT_APP_API_BASE_URL as string,
);

export const authAxios = axiosInstanceWithAuth(
  process.env.REACT_APP_API_BASE_URL as string,
);

export const kakaoAxios = axiosKakaoInstance('https://kauth.kakao.com');
