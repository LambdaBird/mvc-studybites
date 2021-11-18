import api from '@sb-ui/utils/api';

const PATH = '/api/v1/learn';

export const postLessonById = async (paramsData) => {
  const { data } = await api.post(
    `${PATH}/lessons/${paramsData.id}/reply`,
    paramsData,
  );

  return data;
};

export const getEnrolledLesson = async ({ queryKey }) => {
  const [, paramsData] = queryKey;

  const { data } = await api.get(`${PATH}/lessons/${paramsData.id}`);

  return data;
};
