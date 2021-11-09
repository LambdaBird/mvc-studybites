import { Button } from 'antd';
import T from 'prop-types';
import { useTranslation } from 'react-i18next';

import * as S from './RightBar.styled';

const RightBar = ({
  handleShare,
  handlePreview,
  handleSave,
  isPublic,
  isCurrentlyEditing,
}) => {
  const { t } = useTranslation('teacher');

  return (
    <S.Wrapper>
      <Button disabled={isPublic} type="primary" onClick={handleSave}>
        {t('lesson_edit.buttons.save')}
      </Button>
      <Button disabled={!isCurrentlyEditing} onClick={handlePreview}>
        {t('lesson_edit.buttons.preview')}
      </Button>
      <Button disabled={!isCurrentlyEditing} onClick={handleShare}>
        {t('lesson_edit.buttons.share')}
      </Button>
      <S.MoreButton />
    </S.Wrapper>
  );
};

RightBar.propTypes = {
  handleShare: T.func,
  handlePreview: T.func,
  handleSave: T.func,
  isPublic: T.bool,
  isCurrentlyEditing: T.bool,
};

export default RightBar;
