import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import MobileContext from '@sb-ui/contexts/MobileContext';
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
    isRenderEditor,
    isShowAnalytics,
    isLoading,
    isShowShare,
    setIsShowShare,
    editorJsProps,
    studentsCount,
    handleHideLeftBar,
    handleShowLeftBar,
    isLeftBarOpen,
  } = useLessonEdit();

  const isMobile = useContext(MobileContext);

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

      <LeftBar
        handleShowLeftBar={handleShowLeftBar}
        handleHideLeftBar={handleHideLeftBar}
        isOpen={isLeftBarOpen}
        lessons={lessons}
      />
      <RightBar
        isLoading={isLoading}
        isPublic={isPublic}
        publicId={publicId}
        isCurrentlyEditing={isCurrentlyEditing}
        isShowAnalytics={isShowAnalytics}
        isShowShare={isShowShare}
        setIsShowShare={setIsShowShare}
        studentsCount={studentsCount}
        {...handleButtons}
      />
      <S.Page
        isMobile={isMobile}
        isLeftOpen={isLeftBarOpen}
        isRightOpen={isShowAnalytics}
      >
        <S.InputTitle
          disabled={isLoading}
          ref={inputTitle}
          type="text"
          placeholder={t('lesson_edit.title.placeholder')}
          value={name}
          onChange={handleInputTitle}
          onKeyDown={handleNextLine}
        />
        {isRenderEditor && <EditorJs {...editorJsProps} readOnly={false} />}
      </S.Page>
    </>
  );
};

export default LessonEdit;
