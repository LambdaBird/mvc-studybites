import { message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { postShareLesson } from '@sb-ui/utils/api/v1/teacher';
import { HOST, Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import { fallbackCopyTextToClipboard } from '@sb-ui/utils/utils';

export const useLessonActions = ({ handleLessonClick }) => {
  const { t } = useTranslation('teacher');

  const { mutate: shareLesson } = useMutation(postShareLesson);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleVisibleChange = (newVisible) => {
    if (!newVisible) {
      setSelectedLesson(null);
    }
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
  };

  const handleDeleteLesson = (event, id) => {
    event.stopPropagation();
    const { prevLesson, nextLesson } = LessonsStorage.getNearestLesson(id);

    const state = { force: true };
    if (prevLesson) {
      handleLessonClick(prevLesson.id, state);
    } else if (nextLesson) {
      handleLessonClick(nextLesson.id, state);
    } else {
      handleLessonClick('new', state);
    }
    shareLesson({
      id,
      status: Statuses.ARCHIVED,
    });

    LessonsStorage.removeLesson(id);
  };

  return {
    handleSelectLesson,
    handleCopyLink,
    handleDeleteLesson,
    handleVisibleChange,
    selectedLesson,
  };
};
