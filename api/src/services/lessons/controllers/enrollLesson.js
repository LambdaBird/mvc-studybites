const options = {
  schema: {
    params: { $ref: 'paramsLessonPublicId#' },
    response: {
      200: {
        type: 'object',
        properties: {
          key: { type: 'string' },
          message: { type: 'string' },
        },
      },
      '4xx': { $ref: '4xx#' },
      '5xx': { $ref: '5xx#' },
    },
  },
  async onRequest(req) {
    await this.auth({ req });
  },
};

async function handler({ user: { id: userId }, params: { lessonPublicId } }) {
  const {
    config: {
      lessonService: { lessonServiceMessages: messages },
      globals: { resources },
    },
    models: { UserRole, Lesson },
  } = this;

  const lesson = await Lesson.findByPublicId({ lessonPublicId });
  try {
    await UserRole.enrollToResource({
      userId,
      resourceId: lesson.id,
      resourceType: resources.LESSON.name,
      resourceStatuses: resources.LESSON.enrollStatuses,
    });
  } catch (e) {
    if (e.message !== 'errors.fail_enroll') {
      throw e;
    }
  }
  return { message: messages.LESSON_MSG_SUCCESS_ENROLL };
}

export default { options, handler };
