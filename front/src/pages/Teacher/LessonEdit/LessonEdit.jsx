import { Button } from 'antd';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Header from '@sb-ui/components/molecules/Header';
import { useLessonEdit } from '@sb-ui/pages/Teacher/LessonEdit/useLessonEdit';
import { sbPostfix } from '@sb-ui/utils/constants';
import EditorJs from '@sb-ui/utils/editorjs/EditorJsContainer';

import LessonList from './LessonList';
import * as S from './LessonEdit.styled';

const LessonEdit = () => {
  const { t } = useTranslation('teacher');
  const { id: lessonId } = useParams();

  const {
    isCurrentlyEditing,
    name,
    handleShare,
    handleSave,
    handleInputTitle,
    handleNextLine,
    handlePreview,
    lessons,
    publicId,
    isPublic,
    inputTitle,
    isEditorDisabled,
    isRenderEditor,
    editorJsProps,
  } = useLessonEdit({ lessonId });

  return (
    <>
      <Helmet>
        <title>
          {isCurrentlyEditing
            ? t('pages.edit_lesson')
            : t('pages.create_lesson')}
          {sbPostfix}
        </title>
      </Helmet>
      <Header isFixed>
        <Button disabled={isPublic} type="primary" onClick={handleSave}>
          {t('lesson_edit.buttons.save')}
        </Button>

        <div>
          <Button disabled={!isCurrentlyEditing} onClick={handlePreview}>
            {t('lesson_edit.buttons.preview')}
          </Button>
        </div>
        <div>
          <Button disabled={!isCurrentlyEditing} onClick={handleShare}>
            {t('lesson_edit.buttons.share')}
          </Button>
        </div>
      </Header>
      <S.Page>
        <LessonList lessons={lessons} publicId={isPublic && publicId} />

        <S.InputTitle
          ref={inputTitle}
          type="text"
          placeholder={t('lesson_edit.title.placeholder')}
          value={name}
          readOnly={isEditorDisabled}
          onChange={handleInputTitle}
          onKeyDown={handleNextLine}
        />
        {isRenderEditor && isEditorDisabled === true && (
          <EditorJs {...editorJsProps} readOnly />
        )}
        {isRenderEditor && isEditorDisabled === false && (
          <EditorJs {...editorJsProps} readOnly={false} />
        )}
      </S.Page>
    </>
  );
};

export default LessonEdit;
