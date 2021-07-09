/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import {
  clearJWT,
  getJWTAccessToken,
  getJWTRefreshToken,
  setJWT,
} from '../jwt';

export const api = axios.create();

// request interceptor to add the auth token header to requests
api.interceptors.request.use(
  (config) => {
    const accessToken = getJWTAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// response interceptor to refresh token on receiving token expired error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getJWTRefreshToken();
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (!refreshToken) {
          clearJWT();
          return Promise.reject(error);
        }
        const res = await axios.post(`/api/v1/user/refresh_token`, {
          refreshToken,
        });

        if (res.status === 200) {
          setJWT({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          });
          return api(originalRequest);
        }
      } catch (e) {
        clearJWT();
      }
    }
    return Promise.reject(error);
  },
);
