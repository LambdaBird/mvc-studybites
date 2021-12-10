import api from '@sb-ui/utils/api';

const PATH = '/api/v1/user';

export const postCreateAccount = async () => api.post(`${PATH}/create-account`);

export const postSubscribe = async (params) => {
  const { data } = await api.post(`${PATH}/subscribe`, params);
  return data;
};
