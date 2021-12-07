import { useMemo, useState } from 'react';

import { getLesson } from '@sb-ui/utils/api/v1/teacher';

import { apiInteractiveBlocks, postLessonByIdPreview } from './utils';

export const useLessonLearn = () => {
  const [lessonData, setLessonData] = useState({});

  const getLessonByIdPreview = async ({ queryKey }) => {
    const data = await getLesson({ queryKey });
    setLessonData(data);
    const interactiveTotal = data.lesson.blocks.filter((block) =>
      apiInteractiveBlocks.includes(block.type),
    ).length;
    return {
      lesson: {
        ...data.lesson,
        blocks: [],
        interactivePassed: 0,
        interactiveTotal,
      },
      total: interactiveTotal,
    };
  };

  const postLessonByIdPreviewNew = useMemo(
    () => postLessonByIdPreview(lessonData),
    [lessonData],
  );

  return { getLessonByIdPreview, postLessonByIdPreviewNew };
};
