import api from '@sb-ui/utils/api';

const PATH = '/api/v1/user';

export const postCreateAccount = async () => api.post(`${PATH}/create-account`);
