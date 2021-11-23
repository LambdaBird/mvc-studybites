import { resources } from '../../../config';

export const options = {
  schema: {
    params: { $ref: 'paramsLessonId#' },
    body: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: resources.LESSON.status,
          default: 'Draft',
        },
      },
      required: ['status'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: resources.LESSON.status,
            default: 'Draft',
          },
        },
      },
      '4xx': { $ref: '4xx#' },
      '5xx': { $ref: '5xx#' },
    },
  },
};

async function handler({ body: { status }, params: { lessonId } }) {
  const {
    models: { Lesson },
  } = this;

  await Lesson.updateLessonStatus({ lessonId, status });
  return {
    status,
  };
}

export default { options, handler };
