import { message } from 'antd';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import { useBars } from '@sb-ui/pages/Teacher/LessonEdit/useBars';
import { useGetLesson } from '@sb-ui/pages/Teacher/LessonEdit/useGetLesson';
import { useInput } from '@sb-ui/pages/Teacher/LessonEdit/useInput';
import {
  getConfig,
  prepareBlocksForApi,
  prepareEditorData,
} from '@sb-ui/pages/Teacher/LessonEdit/utils';
import { queryClient } from '@sb-ui/query';
import { createLesson, putLesson } from '@sb-ui/utils/api/v1/teacher';
import { Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import { LESSONS_EDIT } from '@sb-ui/utils/paths';
import { TEACHER_LESSON_BASE_KEY } from '@sb-ui/utils/queries';

import { EXAMPLE_LESSON_ID, NEW_LESSON_ID } from './constants';

export const useLessonEdit = () => {
  const { id: lessonId } = useParams();
  const { t, i18n } = useTranslation('teacher');
  const toolbarRef = useRef({});
  const { language } = i18n;

  const isCurrentlyEditing = useMemo(
    () => lessonId !== NEW_LESSON_ID && lessonId !== EXAMPLE_LESSON_ID,
    [lessonId],
  );

  const history = useHistory();
  const editorJSRef = useRef(null);
  const undoPluginRef = useRef(null);

  const {
    lesson,
    isLoading,
    isRenderEditor,
    setIsRenderEditor,
    lessonIdKey,
    setLessonIdKey,
  } = useGetLesson({ lessonId });

  const { inputTitle, handleInputTitle, handleNextLine, name, setName } =
    useInput({
      isLoading,
      lesson,
      toolbarRef,
      editorJSRef,
      lessonId,
    });
  const {
    isShowAnalytics,
    isLeftBarOpen,
    isShowShare,
    setIsShowShare,
    handlePreview,
    handleShare,
    handleShowLeftBar,
    handleHideLeftBar,
    handleAnalytics,
  } = useBars({ lessonId });

  const editorJsPropsRef = useRef({
    ref: undoPluginRef,
    tools: getConfig(t).tools,
    data: {
      blocks: prepareEditorData(lesson?.blocks),
    },
    language,
    lessonId,
    toolbarRef,
    instanceRef: (instance) => {
      editorJSRef.current = instance;
    },
  });

  useEffect(() => {
    if (lesson?.blocks) {
      setName(lesson?.name);
      editorJsPropsRef.current.name = lesson?.name;
      editorJsPropsRef.current.data = {
        blocks: prepareEditorData(lesson?.blocks) || [],
      };
      setIsRenderEditor(true);
      setLessonIdKey(lesson?.id);
    }
  }, [lesson, setIsRenderEditor, setLessonIdKey, setName]);

  const createLessonMutation = useMutation(createLesson, {
    onSuccess: (data, params) => {
      const { editId, name: lessonName } = data?.lesson;
      LessonsStorage.removeLesson(params?.lesson?.editId);
      LessonsStorage.setLesson({
        name: lessonName,
        status: Statuses.DRAFT,
        id: editId,
      });
      history.replace(LESSONS_EDIT.replace(':id', editId));
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
        status: lesson?.status,
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

  const handleSave = useCallback(async () => {
    try {
      const { blocks } = await editorJSRef.current.save();
      const paramsName =
        (lessonId === NEW_LESSON_ID || lessonId === EXAMPLE_LESSON_ID) &&
        name?.trim()?.length === 0
          ? t('lesson_list.untitled')
          : name;

      const params = {
        lesson: {
          editId: lessonId,
          name: paramsName,
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

  return {
    isCurrentlyEditing,
    isRenderEditor,
    isShowAnalytics,
    isLeftBarOpen,
    isLoading,
    isShowShare,
    isPublic: lesson?.status === Statuses.PUBLIC,
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
    name,
    inputTitle,
    lessonIdKey,
    setIsShowShare,
    editorJsPropsRef,
    publicId: lesson?.publicId,
    studentsCount: lesson?.studentsCount,
  };
};
