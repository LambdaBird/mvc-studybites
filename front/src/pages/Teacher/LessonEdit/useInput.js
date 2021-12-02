import { useCallback, useEffect, useRef, useState } from 'react';

import { MAX_NAME_LENGTH } from '@sb-ui/pages/Teacher/LessonEdit/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';

export const useInput = ({
  lessonId,
  isLoading,
  lesson,
  editorJSRef,
  toolbarRef,
}) => {
  const inputTitle = useRef(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (inputTitle.current && !isLoading && !lesson?.name) {
      setTimeout(() => {
        inputTitle.current.focus();
      }, 0);
    }
  }, [inputTitle, isLoading, lesson?.name]);

  const handleInputTitle = useCallback((e) => {
    const newText = e.target.value;
    if (newText.length < MAX_NAME_LENGTH) {
      setName(newText);
    }
  }, []);

  const handleNextLine = (e) => {
    if (e.key === 'Enter' || (e.key === 'Tab' && !e.shiftKey)) {
      editorJSRef.current?.focus?.();
      toolbarRef.current?.removeHideTitle?.();
      toolbarRef.current?.handleFocus?.();
    }
  };

  useEffect(() => {
    const lessonName = lesson?.name;
    if (lessonName) {
      setName(lessonName);
      LessonsStorage.setLesson({
        name: lessonName,
        status: lesson?.status,
        id: lessonId,
      });
    }
    // Should setStorageLesson only when lesson data changes only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  return { inputTitle, handleInputTitle, handleNextLine, name, setName };
};
