export const options = {
  schema: {
    params: { $ref: 'paramsLessonId#' },
    response: {
      200: {
        type: 'object',
        properties: {
          publicId: {
            type: 'string',
          },
        },
      },
      '4xx': { $ref: '4xx#' },
      '5xx': { $ref: '5xx#' },
    },
  },
};

async function handler({ params: { lessonId } }) {
  const {
    models: { Lesson },
  } = this;

  await Lesson.updateLessonStatus({ lessonId, status: 'Public' });
  const { publicId } = await Lesson.findByEditId({ lessonEditId: lessonId });
  return {
    publicId,
  };
}

export default { options, handler };
