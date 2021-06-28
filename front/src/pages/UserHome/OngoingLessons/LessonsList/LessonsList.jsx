import { Col, Empty, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CurrentLesson from '@sb-ui/pages/UserHome/OngoingLessons/OngoingLesson';
import emptyImg from '@sb-ui/resources/img/empty.svg';
import useMobile from '@sb-ui/hooks/useMobile';

import * as S from './LessonsList.styled';

const LessonsList = ({ lessons, isLoading }) => {
  const { t } = useTranslation();
  const isMobile = useMobile();

  if (isLoading || lessons?.length > 0) {
    return (
      <S.LessonsMainRow gutter={isMobile ? [0, 16] : [16, 16]}>
        {isLoading ? (
          <>
            <Col xl={{ span: 8 }} lg={{ span: 24 }}>
              <Skeleton avatar />
            </Col>
            <Col xl={{ span: 8 }} lg={{ span: 24 }}>
              <Skeleton avatar />
            </Col>
            <Col xl={{ span: 8 }} lg={{ span: 24 }}>
              <Skeleton avatar />
            </Col>
          </>
        ) : (
          <>
            {lessons?.map((lesson) => (
              <S.LessonsColumn xl={{ span: 8 }} lg={{ span: 24 }}>
                <CurrentLesson lesson={lesson} />
              </S.LessonsColumn>
            ))}
          </>
        )}
      </S.LessonsMainRow>
    );
  }

  return (
    <S.LessonsMainEmpty>
      <Empty
        image={emptyImg}
        description={t('user_home.open_lessons.not_found')}
      />
    </S.LessonsMainEmpty>
  );
};

LessonsList.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default LessonsList;