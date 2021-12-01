import { useMemo, useState } from 'react';

import { getLesson } from '@sb-ui/utils/api/v1/teacher';

import { apiInteractiveBlocks, postLessonByIdPreview } from './utils';

export const useLessonLearn = () => {
  const [lessonData, setLessonData] = useState({});

  const getLessonByIdPreview = async ({ queryKey }) => {
    const data = await getLesson({ queryKey });
    setLessonData(data);

    return {
      lesson: {
        ...data.lesson,
        blocks: [],
        interactivePassed: 0,
        interactiveTotal: data.lesson.blocks.filter((block) =>
          apiInteractiveBlocks.includes(block.type),
        ).length,
      },
      total: data.lesson.blocks.length,
    };
  };

  const postLessonByIdPreviewNew = useMemo(
    () => postLessonByIdPreview(lessonData),
    [lessonData],
  );

  return { getLessonByIdPreview, postLessonByIdPreviewNew };
};
