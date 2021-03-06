import T from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { FunnelContainer } from '@sb-ui/components/molecules/FunnelContainer';
import { isLessonIdCorrect } from '@sb-ui/pages/Teacher/LessonEdit/useGetLesson';
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
      enabled: isLessonIdCorrect(lessonId),
    },
  );

  const { students } = studentsData || {};

  return (
    <S.Wrapper opened={opened}>
      <S.Title>{t('right_bar.analytics')}</S.Title>
      <S.Content>
        {students?.length > 0 ? (
          <>
            <S.FunnelTitle>
              <S.FunnelTitleHeader>
                {t('right_bar.funnel.title')}
              </S.FunnelTitleHeader>
              <span>{t('right_bar.funnel.description')}</span>
            </S.FunnelTitle>
            <S.FunnelContainerWrapper>
              <FunnelContainer lessonId={lessonId} />
            </S.FunnelContainerWrapper>
            <Students students={students} />
          </>
        ) : (
          <S.NoStudents>{t('right_bar.no_students')}</S.NoStudents>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

Analytics.propTypes = {
  opened: T.bool,
};

export default Analytics;
