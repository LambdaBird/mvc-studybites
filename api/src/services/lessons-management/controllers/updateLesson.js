import { v4 } from 'uuid';

const options = {
  schema: {
    params: { $ref: 'paramsLessonId#' },
    body: {
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
            name: { type: 'string', minLength: 1 },
            description: { type: ['string', 'null'] },
            status: { $ref: 'lessonStatus#' },
          },
        },
        blocks: { type: 'array' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          lesson: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: ['string', 'null'] },
              status: { type: 'string' },
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
              blocks: { type: ['array', 'null'] },
            },
          },
        },
      },
      '4xx': { $ref: '4xx#' },
      '5xx': { $ref: '5xx#' },
    },
  },
};

async function handler({
  body: { lesson, blocks, keywords },
  params: { lessonId },
}) {
  const {
    models: { Lesson, Block, LessonBlockStructure, Keyword },
    config: {
      globals: { resources },
    },
  } = this;

  try {
    const data = await Lesson.transaction(async (trx) => {
      let lessonData;

      if (lesson) {
        lessonData = await Lesson.updateLessonByEditId({
          trx,
          lessonEditId: lessonId,
          lesson,
        });
      } else {
        lessonData = await Lesson.query(trx)
          .first()
          .where({ edit_id: lessonId })
          .returning('*');
      }

      if (keywords) {
        await Keyword.createMany({
          trx,
          keywords,
          resourceId: lessonData.id,
          resourceType: resources.LESSON.name,
          update: true,
        });
      }

      if (blocks) {
        const { values } = await Block.getRevisions({ trx });

        const blocksToInsert = [];

        for (let i = 0, n = blocks.length; i < n; i += 1) {
          const { revision, blockId } = blocks[i];

          if (revision && !blockId) {
            // eslint-disable-next-line no-param-reassign
            blocks[i].blockId = v4();
            if (!blocks[i].weight) {
              // eslint-disable-next-line no-param-reassign
              blocks[i].weight = 1;
            }
            blocksToInsert.push(blocks[i]);
          }

          if (revision && blockId) {
            if (values[blockId] && !values[blockId].includes(revision)) {
              if (!blocks[i].weight) {
                // eslint-disable-next-line no-param-reassign
                blocks[i].weight = 1;
              }
              blocksToInsert.push(blocks[i]);
            }
          }
        }

        if (blocksToInsert.length) {
          await Block.createBlocks({
            trx,
            blocks: blocksToInsert,
          });
        }

        await LessonBlockStructure.query(trx)
          .delete()
          .where({ lesson_id: lessonData.id });
        await LessonBlockStructure.insertBlocks({
          trx,
          blocks,
          lessonId: lessonData.id,
        });
      }
      lessonData.blocks = blocks;
      return lessonData;
    });

    return { lesson: data };
  } catch (err) {
    throw new Error(err);
  }
}

export default { options, handler };
