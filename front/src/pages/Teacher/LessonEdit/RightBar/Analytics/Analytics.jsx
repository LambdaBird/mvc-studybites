import T from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { getTeacherLessonStudents } from '@sb-ui/utils/api/v1/teacher';
import { TEACHER_LESSON_STUDENTS_BASE_KEY } from '@sb-ui/utils/queries';

import Students from './Students';
import * as S from './Analytics.styled';

const Analytics = ({ opened }) => {
  const { id: lessonId } = useParams();
  const { t } = useTranslation('teacher');
  const { data: studentsData } = useQuery(
    [TEACHER_LESSON_STUDENTS_BASE_KEY, { lessonId }],
    getTeacherLessonStudents,
    {
      keepPreviousData: true,
    },
  );

  const { students } = studentsData || {};

  return (
    <S.Wrapper opened={opened}>
      <S.Title>{t('right_bar.analytics')}</S.Title>
      <S.Content>
        <S.FunnelTitle>
          <S.FunnelTitleHeader>
            {t('right_bar.funnel.title')}
          </S.FunnelTitleHeader>
          <span>{t('right_bar.funnel.description')}</span>
        </S.FunnelTitle>
        <div>FUNNEL</div>
        <Students students={students} />
      </S.Content>
    </S.Wrapper>
  );
};

Analytics.propTypes = {
  opened: T.bool,
};

export default Analytics;
