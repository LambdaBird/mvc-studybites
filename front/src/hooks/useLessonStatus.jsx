import { useMutation } from 'react-query';

import { queryClient } from '@sb-ui/query';
import { patchLessonStatus } from '@sb-ui/utils/api/v1/teacher';
import { setStorageLesson } from '@sb-ui/utils/lessonsStorage';
import { TEACHER_LESSON_BASE_KEY } from '@sb-ui/utils/queries';

export const useLessonStatus = ({ id }) => {
  const updateLessonStatusMutation = useMutation(patchLessonStatus, {
    onSuccess: ({ status: statusToChange }) => {
      setStorageLesson({
        status: statusToChange,
        id,
      });
      queryClient.invalidateQueries(TEACHER_LESSON_BASE_KEY);
    },
  });

  return {
    updateLessonStatusMutation,
    isUpdateInProgress: updateLessonStatusMutation.isLoading,
  };
};
