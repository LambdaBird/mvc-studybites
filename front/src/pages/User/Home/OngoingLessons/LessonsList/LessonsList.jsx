import { Col, Empty, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import emptyImg from '@sb-ui/resources/img/empty.svg';
import useMobile from '@sb-ui/hooks/useMobile';
import OngoingShortLesson from '@sb-ui/components/lessonBlocks/OngoingShort';

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
              <S.LessonsColumn
                key={lesson.id}
                xl={{ span: 8 }}
                lg={{ span: 24 }}
              >
                <OngoingShortLesson lesson={lesson} />
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
  ),
  isLoading: PropTypes.bool.isRequired,
};

LessonsList.defaultProps = {
  lessons: [],
};

export default LessonsList;