import { Button, Col, Row, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { LESSON_PAGE } from '@sb-ui/utils/paths';
import lessonImg from '@sb-ui/resources/img/lesson.svg';
import * as S from './OngoingShort.styled';

const { Title } = Typography;

const OngoingShortMobile = ({ lesson }) => {
  const { t } = useTranslation('user');
  const history = useHistory();
  const { name, id, percentage } = lesson;

  const handleContinueLesson = () => {
    history.push(LESSON_PAGE.replace(':id', id));
  };

  return (
    <S.MainSpace>
      <S.LeftColumn span={8}>
        <S.StyledImage src={lessonImg} alt="Lesson" />
        <S.ProgressBar percent={Math.round(percentage)} />
      </S.LeftColumn>
      <S.RightColumn span={16}>
        <Title
          ellipsis={{
            tooltip: true,
            rows: 3,
          }}
          level={4}
        >
          {name}
        </Title>
        <Row justify="end" align="between">
          <Col>
            <Button type="primary" onClick={handleContinueLesson}>
              {t('home.ongoing_lessons.continue_button')}
            </Button>
          </Col>
        </Row>
      </S.RightColumn>
    </S.MainSpace>
  );
};

OngoingShortMobile.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  }).isRequired,
};

export default OngoingShortMobile;
