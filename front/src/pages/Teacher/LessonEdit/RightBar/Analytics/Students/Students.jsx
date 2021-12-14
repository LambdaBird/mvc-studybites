import T from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { interactiveTypesBlocks } from '@sb-ui/utils/api/config';
import { getLesson } from '@sb-ui/utils/api/v1/teacher';
import { TEACHER_LESSON_BASE_KEY } from '@sb-ui/utils/queries';

import { getCountryEmoji } from './countryUtil';
import { getStudentsWithProgress } from './progressUtil';
import { getRelativeTime } from './timeUtil';
import * as S from './Student.styled';

const Students = ({ students }) => {
  const { id: lessonId } = useParams();
  const { t } = useTranslation('teacher');
  const { data: lessonData } = useQuery(
    [TEACHER_LESSON_BASE_KEY, { id: lessonId }],
    getLesson,
    {
      refetchOnWindowFocus: false,
      enabled: lessonId !== 'new',
    },
  );

  const lessonInteractiveBlocksCount = useMemo(
    () =>
      lessonData?.lesson?.blocks.filter((block) =>
        interactiveTypesBlocks.includes(block.type),
      )?.length,
    [lessonData?.lesson?.blocks],
  );

  const studentsWithProgress = useMemo(
    () => getStudentsWithProgress(students, lessonInteractiveBlocksCount),
    [lessonInteractiveBlocksCount, students],
  );

  return (
    <S.Wrapper>
      {studentsWithProgress?.map(
        (
          {
            id,
            countryCode = 'XX',
            country,
            lastActivity,
            learnProgress,
            progressStatus,
          },
          index,
        ) => (
          <S.Student key={id}>
            <span>{index + 1}.</span>
            <S.Tooltip title={country}>
              <span>{getCountryEmoji(countryCode)}</span>
            </S.Tooltip>
            <span>{t('right_bar.anonymous_user')}</span>
            <S.LastActivity>
              {Number.isNaN(lastActivity)
                ? t('right_bar.not_started')
                : getRelativeTime(lastActivity)}
            </S.LastActivity>
            <S.Progress
              percent={learnProgress.toFixed(0)}
              status={progressStatus}
              format={(percent) => (
                <S.ProgressPercent>{percent}%</S.ProgressPercent>
              )}
            />
          </S.Student>
        ),
      )}
    </S.Wrapper>
  );
};

Students.propTypes = {
  students: T.arrayOf(
    T.shape({
      id: T.number,
      countryCode: T.string,
      lastActivity: T.number,
      progress: T.number,
    }),
  ),
};

export default Students;
