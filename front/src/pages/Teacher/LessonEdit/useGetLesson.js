import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import {
  CLIENT_ERROR_STARTS,
  EXAMPLE_LESSON_ID,
  NEW_LESSON_ID,
} from '@sb-ui/pages/Teacher/LessonEdit/constants';
import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { getLesson } from '@sb-ui/utils/api/v1/teacher';
import { Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import { HOME, LESSONS_NEW } from '@sb-ui/utils/paths';
import { TEACHER_LESSON_BASE_KEY } from '@sb-ui/utils/queries';

export const useGetLesson = ({ lessonId }) => {
  const { t } = useTranslation('teacher');
  const history = useHistory();
  const [lessonIdKey, setLessonIdKey] = useState(lessonId);

  const [isRenderEditor, setIsRenderEditor] = useState(false);

  const [lesson, setLesson] = useState(null);

  const { data: lessonData, isLoading } = useQuery(
    [TEACHER_LESSON_BASE_KEY, { id: lessonId }],
    getLesson,
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: lessonId !== NEW_LESSON_ID && lessonId !== EXAMPLE_LESSON_ID,
      onError: (error) => {
        if (error.response.status.toString().startsWith(CLIENT_ERROR_STARTS)) {
          message.error({
            content: t('editor_js.message.error_lesson_not_found'),
            duration: 2,
          });
          LessonsStorage.clearNonexistentLessons(lessonId);
          history.push(LESSONS_NEW);
        }
      },
    },
  );

  useEffect(() => {
    setLesson(lessonData?.lesson);
    LessonsStorage.removeLesson(NEW_LESSON_ID);
  }, [lessonData?.lesson]);

  useEffect(() => {
    if (lessonId === NEW_LESSON_ID) {
      setLesson({
        id: lessonId,
        name: '',
        status: NEW_LESSON_ID,
        blocks: [],
      });
      LessonsStorage.setLesson({
        name: t('lesson_list.untitled'),
        status: Statuses.UNSAVED,
        id: NEW_LESSON_ID,
      });
      return;
    }

    if (lessonId === EXAMPLE_LESSON_ID) {
      const exampleLesson = LessonsStorage.getLesson(EXAMPLE_LESSON_ID);
      if (!exampleLesson) {
        history.push(HOME);
        return;
      }
      const { blocks, name } = exampleLesson || {};
      setLesson({
        id: lessonId,
        name,
        blocks,
        status: EXAMPLE_LESSON_ID,
      });
      LessonsStorage.removeLesson(NEW_LESSON_ID);
    }
  }, [t, lessonId, history]);

  useEffect(() => {
    if (
      lessonId !== NEW_LESSON_ID &&
      lessonId !== EXAMPLE_LESSON_ID &&
      lessonData
    ) {
      amplitudeLogEvent(AMPLITUDE_EVENTS.OPEN_LESSON, lessonId);
    }
  }, [lessonId, lessonData]);

  return {
    lesson,
    isLoading,
    isRenderEditor,
    setIsRenderEditor,
    lessonIdKey,
    setLessonIdKey,
  };
};
