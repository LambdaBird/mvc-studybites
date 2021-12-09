import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import MobileContext from '@sb-ui/contexts/MobileContext';
import LeftBar from '@sb-ui/pages/Teacher/LessonEdit/LeftBar';
import RightBar from '@sb-ui/pages/Teacher/LessonEdit/RightBar';
import { useLessonEdit } from '@sb-ui/pages/Teacher/LessonEdit/useLessonEdit';
import { sbPostfix } from '@sb-ui/utils/constants';
import EditorJs from '@sb-ui/utils/editorjs/EditorJsContainer';

import RouteLeavingGuard from './RouteLeavingGuard';
import { useReloadModal } from './useReloadModal';
import * as S from './LessonEdit.styled';

const LessonEdit = () => {
  const { t } = useTranslation('teacher');

  const {
    isCurrentlyEditing,
    isRenderEditor,
    isShowAnalytics,
    isLeftBarOpen,
    isPublic,
    isLoading,
    isShowShare,
    handleInputTitle,
    handleNextLine,
    handleButtons,
    handleHideLeftBar,
    handleShowLeftBar,
    name,
    inputTitle,
    lessonIdKey,
    publicId,
    setIsShowShare,
    studentsCount,
    editorJsPropsRef,
    isNavigationAllowed,
    setIsNavigationAllowed,
  } = useLessonEdit();

  useReloadModal({ isNavigationAllowed });

  const isMobile = useContext(MobileContext);

  const [open, setOpen] = useState(false);

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
      <RouteLeavingGuard
        when={!isNavigationAllowed}
        setAllowed={setIsNavigationAllowed}
        shouldBlockNavigation={() => !isNavigationAllowed}
      />
      <LeftBar
        handleShowLeftBar={handleShowLeftBar}
        handleHideLeftBar={handleHideLeftBar}
        isOpen={isLeftBarOpen}
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
        {isRenderEditor && (
          <EditorJs
            key={lessonIdKey}
            {...editorJsPropsRef.current}
            readOnly={false}
          />
        )}
        <S.Support open={open} setOpen={setOpen} />
      </S.Page>
    </>
  );
};

export default LessonEdit;
