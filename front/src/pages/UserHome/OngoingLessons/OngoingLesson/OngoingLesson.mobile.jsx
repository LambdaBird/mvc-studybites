import { Button, Col, Row, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { LESSON_PAGE } from '@sb-ui/utils/paths';
import lessonImg from '@sb-ui/resources/img/lesson.svg';
import * as S from './OngoingLesson.styled';

const { Title } = Typography;

const OngoingLessonMobile = ({ lesson }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { name, id } = lesson;

  const handleContinueLesson = () => {
    history.push(LESSON_PAGE.replace(':id', id));
  };

  return (
    <S.MainSpace>
      <S.LeftColumn span={8}>
        <S.StyledImage src={lessonImg} alt="Lesson" />
        <S.ProgressBar percent={50} />
      </S.LeftColumn>
      <S.RightColumn span={16}>
        <Title level={4}>{name}</Title>
        <Row justify="end" align="between">
          <Col>
            <Button type="primary" onClick={handleContinueLesson}>
              {t('user_home.ongoing_lessons.continue_button')}
            </Button>
          </Col>
        </Row>
      </S.RightColumn>
    </S.MainSpace>
  );
};

OngoingLessonMobile.propTypes = {
  lesson: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maintainer: PropTypes.string.isRequired,
  }).isRequired,
};

export default OngoingLessonMobile;