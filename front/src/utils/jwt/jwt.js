const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const getJWT = () => ({
  accessToken: localStorage.getItem(ACCESS_TOKEN),
  refreshToken: localStorage.getItem(REFRESH_TOKEN),
});

export const setJWT = ({ accessToken, refreshToken }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};
