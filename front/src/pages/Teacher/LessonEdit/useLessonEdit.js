import { message } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

import { Statuses } from '@sb-ui/pages/Teacher/Home/Dashboard/constants';
import {
  getConfig,
  prepareBlocksForApi,
  prepareEditorData,
} from '@sb-ui/pages/Teacher/LessonEdit/utils';
import { queryClient } from '@sb-ui/query';
import {
  createLesson,
  getLesson,
  putLesson,
} from '@sb-ui/utils/api/v1/teacher';
import {
  getStorageLessons,
  setStorageLesson,
} from '@sb-ui/utils/lessonsStorage';
import { LESSONS_EDIT, LESSONS_PREVIEW } from '@sb-ui/utils/paths';
import { TEACHER_LESSON_BASE_KEY } from '@sb-ui/utils/queries';

const MAX_NAME_LENGTH = 255;

export const useLessonEdit = () => {
  const { id: lessonId } = useParams();
  const { t, i18n } = useTranslation('teacher');

  const { language } = i18n;
  const isCurrentlyEditing = useMemo(() => lessonId !== 'new', [lessonId]);
  const history = useHistory();
  const editorJSRef = useRef(null);
  const undoPluginRef = useRef(null);
  const [name, setName] = useState('');
  const [dataBlocks, setDataBlocks] = useState(null);
  const [isEditorDisabled, setIsEditorDisabled] = useState(false);
  const [isShowAnalytics, setIsShowAnalytics] = useState(false);
  const [isShowShare, setIsShowShare] = useState(false);

  const inputTitle = useRef(null);

  const lessons = getStorageLessons();

  const { data: lessonData, isLoading } = useQuery(
    [TEACHER_LESSON_BASE_KEY, { id: lessonId }],
    getLesson,
    {
      refetchOnWindowFocus: false,
      enabled: isCurrentlyEditing,
    },
  );

  const createLessonMutation = useMutation(createLesson, {
    onSuccess: (data) => {
      const { editId, name: lessonName } = data?.lesson;
      setStorageLesson({
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
      setStorageLesson({
        name: data.lesson.name,
        status: Statuses.DRAFT,
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
    setIsShowAnalytics((prev) => !prev);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const { blocks } = await editorJSRef.current.save();
      const params = {
        lesson: {
          editId: lessonId,
          name,
          status: Statuses.DRAFT,
        },
        blocks: prepareBlocksForApi(blocks),
      };
      if (!name) {
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
    history.push(LESSONS_PREVIEW.replace(':id', lessonId));
  };

  useEffect(() => {
    if (lessonData?.lesson.name) {
      setName(lessonData.lesson.name);
    }
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
      }
      if (!lessonData.lesson.status || lessonData?.lesson.status === 'Draft') {
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
    lessons,
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
