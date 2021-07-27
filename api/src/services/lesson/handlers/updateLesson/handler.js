import { v4 } from 'uuid';

export async function updateLessonHandler({
  body: { lesson, blocks },
  params: { lessonId },
}) {
  const {
    models: { Lesson, Block, LessonBlockStructure },
  } = this;

  try {
    const data = await Lesson.transaction(async (trx) => {
      let lessonData;

      if (lesson) {
        lessonData = await Lesson.updateLesson({ trx, lessonId, lesson });
      } else {
        lessonData = await Lesson.query(trx).findById(lessonId);
      }

      if (blocks) {
        const { values } = await Block.getRevisions({ trx });

        const blocksToInsert = [];

        for (let i = 0, n = blocks.length; i < n; i += 1) {
          const { revision, blockId } = blocks[i];

          if (revision && !blockId) {
            // eslint-disable-next-line no-param-reassign
            blocks[i].blockId = v4();
            blocksToInsert.push(blocks[i]);
          }

          if (revision && blockId) {
            if (values[blockId] && !values[blockId].includes(revision)) {
              blocksToInsert.push(blocks[i]);
            }
          }
        }

        if (blocksToInsert.length) {
          const blocksData = await Block.createBlocks({
            trx,
            blocks: blocksToInsert,
          });
          lessonData.blocks = blocksData;
        }

        await LessonBlockStructure.query(trx).delete().where({ lessonId });
        await LessonBlockStructure.insertBlocks({
          trx,
          blocks,
          lessonId,
        });
      }

      return lessonData;
    });

    return { lesson: data };
  } catch (err) {
    throw new Error(err);
  }
}