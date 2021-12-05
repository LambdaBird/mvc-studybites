import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import {
  DESKTOP_WIDTH,
  getCurrentWidth,
} from '@sb-ui/hooks/useMobile/useMobile';
import { isLessonIdCorrect } from '@sb-ui/pages/Teacher/LessonEdit/useGetLesson';
import { prepareBlocksForApi } from '@sb-ui/pages/Teacher/LessonEdit/utils';
import { queryClient } from '@sb-ui/query';
import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { createLesson, putLesson } from '@sb-ui/utils/api/v1/teacher';
import { Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import { LESSONS_EDIT, LESSONS_PREVIEW } from '@sb-ui/utils/paths';
import { TEACHER_LESSON_BASE_KEY } from '@sb-ui/utils/queries';

export const useBars = ({ lessonId, editorJSRef, name }) => {
  const history = useHistory();
  const { t } = useTranslation('teacher');

  const [isShowShare, setIsShowShare] = useState(false);
  const [isShowAnalytics, setIsShowAnalytics] = useState(false);
  const [isLeftBarOpen, setIsLeftBarOpen] = useState(
    getCurrentWidth() >= DESKTOP_WIDTH,
  );

  const updateLessonMutation = useMutation(putLesson, {
    onSuccess: async (data) => {
      LessonsStorage.setLesson({
        name: data.lesson.name,
        status: data?.lesson.status,
        id: lessonId,
      });
      await queryClient.invalidateQueries([
        TEACHER_LESSON_BASE_KEY,
        { id: lessonId },
      ]);
      history.push(LESSONS_PREVIEW.replace(':id', lessonId), { force: true });
    },
  });

  const createLessonMutation = useMutation(createLesson, {
    onSuccess: async (data, params) => {
      const { editId, name: lessonName } = data?.lesson;
      LessonsStorage.removeLesson(params?.lesson?.editId);
      LessonsStorage.setLesson({
        name: lessonName,
        status: Statuses.DRAFT,
        id: editId,
      });
      history.push(LESSONS_EDIT.replace(':id', editId), { force: true });
      history.push(LESSONS_PREVIEW.replace(':id', editId), { force: true });
    },
  });

  const handlePreview = async () => {
    amplitudeLogEvent(AMPLITUDE_EVENTS.PREVIEW);
    const { blocks } = await editorJSRef.current.save();
    const params = {
      lesson: {
        editId: lessonId,
        name: name?.trim()?.length === 0 ? t('lesson_list.untitled') : name,
      },
      blocks: prepareBlocksForApi(blocks),
    };

    if (isLessonIdCorrect(lessonId)) {
      updateLessonMutation.mutate(params);
    } else {
      createLessonMutation.mutate(params);
    }
  };

  const handleAnalytics = useCallback(() => {
    if (isShowAnalytics === false) {
      amplitudeLogEvent(AMPLITUDE_EVENTS.OPEN_ANALYTICS);
    }
    setIsShowAnalytics((prev) => !prev);
  }, [isShowAnalytics]);

  const handleHideLeftBar = useCallback(() => {
    setIsLeftBarOpen(false);
  }, []);

  const handleShowLeftBar = useCallback(() => {
    setIsLeftBarOpen(true);
  }, []);

  const handleShare = useCallback(async () => {
    setIsShowShare((prev) => !prev);
  }, []);

  return {
    handleAnalytics,
    handleHideLeftBar,
    handleShowLeftBar,
    handlePreview,
    handleShare,
    isLeftBarOpen,
    isShowAnalytics,
    isShowShare,
    setIsShowShare,
  };
};
