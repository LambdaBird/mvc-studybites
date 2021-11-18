import api from '@sb-ui/utils/api';

const PATH = '/api/v1/lessons-management';

export const createLesson = async (values) => {
  const { data } = await api.post(`${PATH}/lessons`, values);
  return data;
};

export const putLesson = async (params) => {
  const { data } = await api.put(
    `${PATH}/lessons/${params.lesson.editId}`,
    params,
  );
  return data;
};

export const getLesson = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  const { data } = await api.get(`${PATH}/lessons/${id}`);
  return data;
};

export const getTeacherLessonStudents = async ({ queryKey }) => {
  const [, { lessonId, offset, limit, search }] = queryKey;

  const { data } = await api.get(`${PATH}/lessons/${lessonId}/students`, {
    params: {
      offset,
      limit,
      search,
    },
  });

  return {
    ...data,
    students: data.students.map((x) => ({
      ...x,
      lastActivity: +new Date(x.results?.[x.results.length - 1]?.createdAt),
    })),
  };
};

export const postShareLesson = async (params) => {
  const { data } = await api.post(
    `${PATH}/lessons/${params.id}/share-lesson`,
    params,
  );
  return data;
};
