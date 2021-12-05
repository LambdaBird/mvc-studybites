import { message } from 'antd';
import equal from 'fast-deep-equal';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import { useBars } from '@sb-ui/pages/Teacher/LessonEdit/useBars';
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
import { isLessonIdCorrect, useGetLesson } from './useGetLesson';

export const useLessonEdit = () => {
  const { id: lessonId } = useParams();
  const { t, i18n } = useTranslation('teacher');
  const toolbarRef = useRef({});
  const { language } = i18n;

  const isCurrentlyEditing = useMemo(
    () => isLessonIdCorrect(lessonId),
    [lessonId],
  );

  const history = useHistory();
  const editorJSRef = useRef(null);
  const undoPluginRef = useRef(null);
  const currentBlocksRef = useRef({ blocks: null });
  const [blocksTrigger, setBlocksTrigger] = useState(null);
  const [isNavigationAllowed, setIsNavigationAllowed] = useState(false);

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
    onChange: (api, dataBlocks) => {
      currentBlocksRef.current.blocks = dataBlocks.blocks;
      setBlocksTrigger(dataBlocks.blocks);
    },

    instanceRef: async (instance) => {
      editorJSRef.current = instance;
      await instance.isReady;
      const saveData = await instance.save();
      currentBlocksRef.current.blocks = saveData.blocks;
    },
  });

  useEffect(() => {
    if (lesson?.blocks) {
      setName(lesson?.name);
      editorJsPropsRef.current.name = lesson?.name;
      const data = {
        blocks: prepareEditorData(lesson?.blocks) || [],
      };
      editorJsPropsRef.current.data = data;
      currentBlocksRef.current.blocks = data.blocks;
      setBlocksTrigger(data.blocks);
      setIsRenderEditor(true);
      setLessonIdKey(lesson?.id);
    }
  }, [lesson, setIsRenderEditor, setLessonIdKey, setName]);

  const isBlocksChanged = useCallback((lessonBlocks) => {
    const oldBlocks = prepareEditorData(lessonBlocks);
    if (!currentBlocksRef.current?.blocks || !oldBlocks) {
      return false;
    }
    return !equal(oldBlocks, currentBlocksRef.current.blocks);
  }, []);

  const createLessonMutation = useMutation(createLesson, {
    onSuccess: (data, params) => {
      const { editId, name: lessonName } = data?.lesson;
      LessonsStorage.removeLesson(params?.lesson?.editId);
      LessonsStorage.setLesson({
        name: lessonName,
        status: Statuses.DRAFT,
        id: editId,
      });
      history.replace(LESSONS_EDIT.replace(':id', editId), {
        force: true,
      });
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
      currentBlocksRef.current.blocks = params.blocks;
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

  useEffect(() => {
    if (isBlocksChanged(lesson?.blocks)) {
      setIsNavigationAllowed(false);
    } else {
      setIsNavigationAllowed(true);
    }
  }, [blocksTrigger, isBlocksChanged, lesson?.blocks]);

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
    isNavigationAllowed,
    setIsNavigationAllowed,
    lessonIdKey,
    setIsShowShare,
    editorJsPropsRef,
    publicId: lesson?.publicId,
    studentsCount: lesson?.studentsCount,
  };
};
