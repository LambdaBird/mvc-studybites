import T from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  EyeOutlined,
  PieChartOutlined,
  SaveOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import Button from '@sb-ui/components/atoms/Button';

import Analytics from './Analytics';
import ShareModal from './ShareModal';
import * as S from './RightBar.styled';

const pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

const RightBar = ({
  handleShare,
  handlePreview,
  handleSave,
  handleAnalytics,
  isShowAnalytics,
  isShowShare,
  setIsShowShare,
  isPublic,
  isLoading,
  publicId,
  isCurrentlyEditing,
  studentsCount = 0,
}) => {
  const { t } = useTranslation('teacher');

  return (
    <S.Wrapper>
      {isLoading && <S.Spin />}
      <Button
        iconComponent={<SaveOutlined />}
        bold
        type="primary"
        onClick={handleSave}
      >
        {t('lesson_edit.buttons.save')}
      </Button>
      <Button
        iconComponent={<PieChartOutlined />}
        active={isShowAnalytics}
        onClick={handleAnalytics}
      >
        {t('lesson_edit.buttons.analytics', {
          user: pluralize(
            studentsCount,
            t('lesson_edit.buttons.analytics_user'),
          ),
        })}
      </Button>
      <Button iconComponent={<EyeOutlined />} onClick={handlePreview}>
        {t('lesson_edit.buttons.preview')}
      </Button>
      <Button
        iconComponent={<ShareAltOutlined />}
        disabled={!isCurrentlyEditing}
        onClick={handleShare}
      >
        {t('lesson_edit.buttons.share')}
      </Button>
      <Analytics opened={isShowAnalytics} />
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
  isLoading: T.bool,
  isCurrentlyEditing: T.bool,
  isShowAnalytics: T.bool,
  isShowShare: T.bool,
  setIsShowShare: T.func,
  studentsCount: T.number,
};

export default RightBar;
