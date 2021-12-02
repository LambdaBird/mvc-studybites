import { useState } from 'react';
import { useMutation } from 'react-query';

import { postShareLesson } from '@sb-ui/utils/api/v1/teacher';
import { Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';

export const useLessonRemove = ({ handleLessonClick }) => {
  const { mutate: shareLesson } = useMutation(postShareLesson);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleVisibleChange = (visible) => {
    if (!visible) {
      setSelectedLesson(null);
    }
  };

  const handleLessonRemove = (event, id) => {
    event.stopPropagation();
    setSelectedLesson(id);
  };

  const handleCancelDelete = (event) => {
    event.stopPropagation();
  };

  const handleConfirmDelete = (event, id) => {
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
    handleLessonRemove,
    handleCancelDelete,
    handleConfirmDelete,
    handleVisibleChange,
    selectedLesson,
  };
};
