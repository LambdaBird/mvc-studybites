import { Skeleton, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import * as S from './InfoBlock.styled';

const { Text } = Typography;

const InfoBlock = ({ isLoading, lesson, total }) => {
  const { t } = useTranslation('user');

  return (
    <S.BlockWrapper justify="start" align="top">
      {isLoading ? (
        <Skeleton loading={isLoading} paragraph={{ rows: 1 }} active />
      ) : (
        <>
          <S.TitleEllipsis>{lesson.name}</S.TitleEllipsis>
          <S.StyledRow>{lesson.description}</S.StyledRow>
          <S.StyledRow justify="space-between">
            <Text type="secondary">
              {total} {t('lesson.blocks')}
            </Text>
          </S.StyledRow>
        </>
      )}
    </S.BlockWrapper>
  );
};

InfoBlock.propTypes = {
  lesson: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }),
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

InfoBlock.defaultProps = {
  lesson: {},
};

export default InfoBlock;
