import { Button } from 'antd';
import T from 'prop-types';
import { useTranslation } from 'react-i18next';

import Analytics from './Analytics';
import ShareModal from './ShareModal';
import * as S from './RightBar.styled';

const RightBar = ({
  handleShare,
  handlePreview,
  handleSave,
  handleAnalytics,
  isShowAnalytics,
  isShowShare,
  setIsShowShare,
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
      <Analytics opened={isShowAnalytics} publicId={publicId} />
      <ShareModal
        publicId={isPublic && publicId}
        opened={isShowShare}
        setOpened={setIsShowShare}
      />
    </S.Wrapper>
  );
};

RightBar.propTypes = {
  handleShare: T.func,
  handlePreview: T.func,
  handleSave: T.func,
  handleAnalytics: T.func,
  publicId: T.string,
  isPublic: T.bool,
  isCurrentlyEditing: T.bool,
  isShowAnalytics: T.bool,
  isShowShare: T.bool,
  setIsShowShare: T.func,
  studentsCount: T.number,
};

export default RightBar;
