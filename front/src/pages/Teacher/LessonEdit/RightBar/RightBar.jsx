import { Button } from 'antd';
import T from 'prop-types';
import { useTranslation } from 'react-i18next';

import Analytics from './Analytics';
import * as S from './RightBar.styled';

const RightBar = ({
  handleShare,
  handlePreview,
  handleSave,
  handleAnalytics,
  isShowAnalytics,
  isPublic,
  publicId,
  isCurrentlyEditing,
  studentsCount,
}) => {
  const { t } = useTranslation('teacher');

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
      <Analytics opened={isShowAnalytics} publicId={publicId} />
    </S.Wrapper>
  );
};

RightBar.propTypes = {
  handleShare: T.func,
  handlePreview: T.func,
  handleSave: T.func,
  handleAnalytics: T.func,
  isPublic: T.bool,
  publicId: T.string,
  isCurrentlyEditing: T.bool,
  isShowAnalytics: T.bool,
  studentsCount: T.number,
};

export default RightBar;
