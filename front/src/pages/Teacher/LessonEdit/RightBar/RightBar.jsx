import { Button } from 'antd';
import T from 'prop-types';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Analytics from '@sb-ui/pages/Teacher/LessonEdit/RightBar/Analytics';

import * as S from './RightBar.styled';

const RightBar = ({
  handleShare,
  handlePreview,
  handleSave,
  isPublic,
  isCurrentlyEditing,
  studentsCount,
}) => {
  const { t } = useTranslation('teacher');
  const [isShowAnalytics, setIsShowAnalytics] = useState(false);
  const handleAnalytics = useCallback(() => {
    setIsShowAnalytics((prev) => !prev);
  }, []);

  return (
    <S.Wrapper>
      <Button disabled={isPublic} type="primary" onClick={handleSave}>
        {t('lesson_edit.buttons.save')}
      </Button>
      <Button onClick={handleAnalytics}>
        Analytics ({studentsCount} users)
      </Button>
      <Button disabled={!isCurrentlyEditing} onClick={handlePreview}>
        {t('lesson_edit.buttons.preview')}
      </Button>
      <Button disabled={!isCurrentlyEditing} onClick={handleShare}>
        {t('lesson_edit.buttons.share')}
      </Button>
      <S.MoreButton />
      <Analytics opened={isShowAnalytics} />
    </S.Wrapper>
  );
};

RightBar.propTypes = {
  handleShare: T.func,
  handlePreview: T.func,
  handleSave: T.func,
  isPublic: T.bool,
  isCurrentlyEditing: T.bool,
  studentsCount: T.number,
};

export default RightBar;
