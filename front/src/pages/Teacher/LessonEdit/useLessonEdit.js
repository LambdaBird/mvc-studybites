import { message } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import {
  DESKTOP_WIDTH,
  getCurrentWidth,
} from '@sb-ui/hooks/useMobile/useMobile';
import {
  getConfig,
  prepareBlocksForApi,
  prepareEditorData,
} from '@sb-ui/pages/Teacher/LessonEdit/utils';
import { queryClient } from '@sb-ui/query';
import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import {
  createLesson,
  getLesson,
  putLesson,
} from '@sb-ui/utils/api/v1/teacher';
import { Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import { LESSONS_EDIT, LESSONS_NEW, LESSONS_PREVIEW } from '@sb-ui/utils/paths';
import { TEACHER_LESSON_BASE_KEY } from '@sb-ui/utils/queries';

import {
  CLIENT_ERROR_STARTS,
  MAX_NAME_LENGTH,
  NEW_LESSON_ID,
} from './constants';

export const useLessonEdit = () => {
  const { id: lessonId } = useParams();
  const { t, i18n } = useTranslation('teacher');

  const { language } = i18n;
  const isCurrentlyEditing = useMemo(
    () => lessonId !== NEW_LESSON_ID,
    [lessonId],
  );
  const history = useHistory();
  const editorJSRef = useRef(null);
  const undoPluginRef = useRef(null);
  const [name, setName] = useState('');
  const [dataBlocks, setDataBlocks] = useState(null);
  const [isEditorDisabled, setIsEditorDisabled] = useState(false);
  const [isShowAnalytics, setIsShowAnalytics] = useState(false);

  const [isLeftBarOpen, setIsLeftBarOpen] = useState(
    getCurrentWidth() >= DESKTOP_WIDTH,
  );
  const [isShowShare, setIsShowShare] = useState(false);

  const inputTitle = useRef(null);

  const { data: lessonData, isLoading } = useQuery(
    [TEACHER_LESSON_BASE_KEY, { id: lessonId }],
    getLesson,
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: isCurrentlyEditing,
      onError: (error) => {
        if (error.response.status.toString().startsWith(CLIENT_ERROR_STARTS)) {
          LessonsStorage.clearNonexistentLessons(lessonId);
          history.push(LESSONS_NEW);
        }
      },
    },
  );

  useEffect(() => {
    if (lessonId !== NEW_LESSON_ID && lessonData) {
      amplitudeLogEvent(AMPLITUDE_EVENTS.OPEN_LESSON, lessonId);
    }
  }, [lessonId, lessonData]);

  const createLessonMutation = useMutation(createLesson, {
    onSuccess: (data) => {
      const { editId, name: lessonName } = data?.lesson;
      LessonsStorage.removeLesson(NEW_LESSON_ID);
      LessonsStorage.setLesson({
        name: lessonName,
        status: Statuses.DRAFT,
        id: editId,
      });
      history.replace(LESSONS_EDIT.replace(':id', editId), { newLesson: true });
      message.success({
        content: t('editor_js.message.success_created'),
        duration: 2,
      });
    },
    onError: () => {
      message.error({
        content: t('editor_js.message.error_created'),
        duration: 2,
      });
    },
  });

  const updateLessonMutation = useMutation(putLesson, {
    onSuccess: (data) => {
      if (editorJSRef.current && data) {
        const editorToRender = {
          blocks: prepareEditorData(data?.lesson?.blocks),
        };

        if (editorToRender.blocks.length === 0) {
          editorJSRef.current?.clear();
        } else {
          editorJSRef.current?.render?.(editorToRender);
        }
        undoPluginRef.current?.initialize(editorToRender);
      }
      LessonsStorage.setLesson({
        name: data.lesson.name,
        status: lessonData?.lesson?.status,
        id: lessonId,
      });
      queryClient.invalidateQueries([
        TEACHER_LESSON_BASE_KEY,
        { id: lessonId },
      ]);
      message.success({
        content: t('editor_js.message.success_updated'),
        duration: 2,
      });
    },
    onError: () => {
      message.error({
        content: t('editor_js.message.error_updated'),
        duration: 2,
      });
    },
  });

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

  const handleSave = useCallback(async () => {
    try {
      const { blocks } = await editorJSRef.current.save();
      const params = {
        lesson: {
          editId: lessonId,
          name:
            !isCurrentlyEditing && name?.trim()?.length === 0
              ? t('lesson_list.untitled')
              : name,
        },
        blocks: prepareBlocksForApi(blocks),
      };

      if (!params.lesson.name) {
        message.error({
          content: t('editor_js.message.error_lesson_name'),
          duration: 2,
        });
        return;
      }

      if (params.blocks.length === 0) {
        message.error({
          content: t('editor_js.message.error_empty_blocks'),
          duration: 2,
        });
        return;
      }

      if (isCurrentlyEditing) updateLessonMutation.mutate(params);
      else createLessonMutation.mutate(params);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Editor JS error: ', e);
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureMessage(e);
      }
    }
  }, [
    createLessonMutation,
    isCurrentlyEditing,
    lessonId,
    name,
    t,
    updateLessonMutation,
  ]);

  const handleShare = useCallback(async () => {
    setIsShowShare((prev) => !prev);
  }, []);

  const handleInputTitle = useCallback((e) => {
    const newText = e.target.value;
    if (newText.length < MAX_NAME_LENGTH) {
      setName(newText);
    }
  }, []);

  const handleNextLine = (e) => {
    if (e.key === 'Enter') {
      editorJSRef.current?.focus?.();
    }
  };

  const handlePreview = () => {
    amplitudeLogEvent(AMPLITUDE_EVENTS.PREVIEW);
    history.push(LESSONS_PREVIEW.replace(':id', lessonId));
  };

  useEffect(() => {
    const lessonName = lessonData?.lesson?.name;
    if (lessonName) {
      setName(lessonName);
      LessonsStorage.setLesson({
        name: lessonName,
        status: lessonData?.lesson?.status,
        id: lessonId,
      });
    }
    // Should setStorageLesson only when lesson data changes only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonData?.lesson]);

  useEffect(() => {
    if (!isCurrentlyEditing) {
      setName('');
      setDataBlocks(null);
      editorJSRef.current?.clear?.();
      setIsEditorDisabled(false);
    }
  }, [editorJSRef, isCurrentlyEditing, setName]);

  const isPublic = lessonData?.lesson?.status === Statuses.PUBLIC;

  useEffect(() => {
    if (inputTitle.current && !isLoading && !lessonData?.lesson.name) {
      setTimeout(() => {
        inputTitle.current.focus();
      }, 0);
    }
  }, [inputTitle, isLoading, lessonData?.lesson.name]);

  useEffect(() => {
    if (lessonData) {
      const blocks = prepareEditorData(lessonData?.lesson?.blocks);
      setDataBlocks({
        blocks,
      });
      if (blocks.length === 0) {
        editorJSRef.current?.clear();
      } else {
        editorJSRef.current?.render?.({ blocks });

        if (editorJSRef?.current?.render) {
          undoPluginRef.current?.initialize?.({ blocks });
        }
      }
      if (
        !lessonData.lesson.status ||
        lessonData?.lesson.status === Statuses.DRAFT
      ) {
        setIsEditorDisabled(false);
      } else {
        setIsEditorDisabled(true);
      }
    }
  }, [editorJSRef, lessonData]);

  const isRenderEditor = useMemo(
    () => !isCurrentlyEditing || dataBlocks,
    [dataBlocks, isCurrentlyEditing],
  );

  useEffect(() => {
    if (!isCurrentlyEditing) {
      const lessonName = name || t('lesson_list.untitled');
      LessonsStorage.setLesson({
        name: lessonName,
        status: Statuses.UNSAVED,
        id: NEW_LESSON_ID,
      });
    }
  }, [isCurrentlyEditing, name, t]);

  const editorJsProps = useMemo(
    () => ({
      ref: undoPluginRef,
      tools: getConfig(t).tools,
      data: dataBlocks,
      language,
      lessonId,
      instanceRef: (instance) => {
        editorJSRef.current = instance;
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataBlocks, language, t],
  );

  const publicId = useMemo(
    () => lessonData?.lesson?.publicId,
    [lessonData?.lesson?.publicId],
  );

  return {
    isLoading,
    isCurrentlyEditing,
    name,
    handleNextLine,
    handleInputTitle,
    handleButtons: {
      handleSave,
      handlePreview,
      handleShare,
      handleAnalytics,
    },
    handleHideLeftBar,
    handleShowLeftBar,
    isLeftBarOpen,
    publicId,
    isPublic,
    inputTitle,
    isEditorDisabled,
    isRenderEditor,
    isShowAnalytics,
    isShowShare,
    setIsShowShare,
    editorJsProps,
    studentsCount: lessonData?.lesson?.studentsCount,
  };
};
