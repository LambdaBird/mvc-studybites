const options = {
  schema: {
    params: { $ref: 'paramsLessonEditId#' },
    querystring: { $ref: 'userSearch#' },
    response: {
      200: {
        type: 'object',
        properties: {
          total: { type: 'number' },
          students: { type: 'array' },
        },
      },
      '4xx': { $ref: '4xx#' },
      '5xx': { $ref: '5xx#' },
    },
  },
};

async function handler({
  params: { lessonEditId },
  query: { search, offset, limit },
}) {
  const {
    models: { UserRole, Lesson },
  } = this;

  const { id: lessonId } = await Lesson.findByEditId({ lessonEditId });

  const { total, results: students } = await UserRole.getAllStudentsOfResource({
    resourceId: lessonId,
    offset,
    limit,
    search,
  });

  return { total, students };
}

export default { options, handler };
