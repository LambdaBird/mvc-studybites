import api from '@sb-ui/utils/api';

const PATH = '/api/v1/lessons';

export const forceEnrollLesson = async (id) => {
  const { data } = await api.post(`${PATH}/${id}/force-enroll`);
  return data;
};
