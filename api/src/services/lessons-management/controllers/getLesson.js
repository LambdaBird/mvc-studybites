const options = {
  schema: {
    params: { $ref: 'paramsLessonEditId' },
    response: {
      200: {
        type: 'object',
        properties: {
          keywords: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
              },
            },
          },
          lesson: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              editId: { type: 'string' },
              publicId: { type: 'string' },
              name: { type: 'string' },
              description: { type: ['string', 'null'] },
              image: { type: ['string', 'null'] },
              status: { type: 'string' },
              studentsCount: { type: 'number' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
              author: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                },
              },
              blocks: { type: 'array' },
              courses: { type: 'array' },
            },
          },
        },
      },
      '4xx': { $ref: '4xx#' },
      '5xx': { $ref: '5xx#' },
    },
  },
};

async function handler({ params: { lessonEditId } }) {
  const {
    models: { Lesson, LessonBlockStructure, UserRole, ResourceKeyword },
    config: {
      globals: { resources },
    },
  } = this;

  const lesson = await Lesson.findByEditId({ lessonEditId });
  const lessonId = lesson.id;

  const { count: studentsCount } = await UserRole.getResourceStudentsCount({
    resourceId: lessonId,
    resourceType: resources.LESSON.name,
  });

  lesson.studentsCount = studentsCount;
  lesson.blocks = await LessonBlockStructure.getAllBlocks({ lessonId });
  const keywords = await ResourceKeyword.getResourceKeywords({
    resourceId: lessonId,
    resourceType: resources.LESSON.name,
  });
  return { lesson, keywords };
}

export default { options, handler };
