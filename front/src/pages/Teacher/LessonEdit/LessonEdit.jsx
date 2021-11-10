import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import LeftBar from '@sb-ui/pages/Teacher/LessonEdit/LeftBar';
import RightBar from '@sb-ui/pages/Teacher/LessonEdit/RightBar';
import { useLessonEdit } from '@sb-ui/pages/Teacher/LessonEdit/useLessonEdit';
import { sbPostfix } from '@sb-ui/utils/constants';
import EditorJs from '@sb-ui/utils/editorjs/EditorJsContainer';

import * as S from './LessonEdit.styled';

const LessonEdit = () => {
  const { t } = useTranslation('teacher');

  const {
    isCurrentlyEditing,
    name,
    handleInputTitle,
    handleNextLine,
    handleButtons,
    lessons,
    isPublic,
    publicId,
    inputTitle,
    isEditorDisabled,
    isRenderEditor,
    isShowAnalytics,
    editorJsProps,
    studentsCount,
  } = useLessonEdit();

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

      <LeftBar lessons={lessons} />
      <RightBar
        isPublic={isPublic}
        publicId={publicId}
        isCurrentlyEditing={isCurrentlyEditing}
        isShowAnalytics={isShowAnalytics}
        studentsCount={studentsCount}
        {...handleButtons}
      />
      <S.Page isRightOpen={isShowAnalytics}>
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
