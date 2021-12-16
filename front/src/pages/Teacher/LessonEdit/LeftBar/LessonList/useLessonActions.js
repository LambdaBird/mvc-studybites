import { message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { LESSONS_ACTIONS } from '@sb-ui/pages/Teacher/LessonEdit/LeftBar/constants';
import { postShareLesson } from '@sb-ui/utils/api/v1/teacher';
import { HOST, Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import { fallbackCopyTextToClipboard } from '@sb-ui/utils/utils';

export const useLessonActions = () => {
  const { t } = useTranslation('teacher');

  const [visible, setVisible] = useState(false);
  const { mutate: shareLesson } = useMutation(postShareLesson);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleVisibleChange = (newVisible) => {
    if (!newVisible) {
      setSelectedLesson(null);
    }
    setVisible(newVisible);
  };

  const handleSelectLesson = (event, id) => {
    event.stopPropagation();
    setSelectedLesson(id);
  };

  const handleCopyLink = (event, id) => {
    event.stopPropagation();
    const fullLink = `${HOST}/${id}`;
    fallbackCopyTextToClipboard(fullLink);
    message.success({
      content: t('lesson_list.link_copy_successfully'),
      duration: 2,
    });
    setSelectedLesson(null);
  };

  const changeLessonStatus = async (event, id, status) => {
    event.stopPropagation();
    await shareLesson({
      id,
      status,
    });
    const lesson = LessonsStorage.getLesson(id);
    LessonsStorage.setLesson({
      ...lesson,
      status,
    });
    setSelectedLesson(null);
  };

  const handleDeleteLesson = async (event, id) => {
    await changeLessonStatus(event, id, Statuses.ARCHIVED);
  };

  const handleRestoreLesson = async (event, id) => {
    await changeLessonStatus(event, id, Statuses.DRAFT);
  };

  const getActionHandlerByName = (actionName) => {
    switch (actionName) {
      case LESSONS_ACTIONS.COPY_LINK:
        return handleCopyLink;
      case LESSONS_ACTIONS.DELETE_LESSON:
        return handleDeleteLesson;
      case LESSONS_ACTIONS.RESTORE_LESSON:
        return handleRestoreLesson;
      default:
        return () => {};
    }
  };

  return {
    handleSelectLesson,
    handleVisibleChange,
    getActionHandlerByName,
    selectedLesson,
    visible,
  };
};
