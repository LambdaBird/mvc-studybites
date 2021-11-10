import T from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { getEnrolledLesson } from '@sb-ui/utils/api/v1/student';
import { LESSON_BASE_QUERY } from '@sb-ui/utils/queries';

import { getCountryEmoji } from './countryUtil';
import { getStudentProgress } from './progressUtil';
import { getRelativeTime } from './timeUtil';
import * as S from './Student.styled';

const Students = ({ students, publicId }) => {
  const { t } = useTranslation('teacher');
  const { data: lessonData } = useQuery(
    [
      LESSON_BASE_QUERY,
      {
        id: publicId,
      },
    ],
    getEnrolledLesson,
    {
      enabled: !!publicId,
    },
  );

  const progressData = {
    isFinished: lessonData?.isFinished,
    ...(lessonData?.lesson || {}),
  };

  return (
    <S.Wrapper>
      {students?.map(({ id, countryCode = 'XX', lastActivity }, index) => {
        const { learnProgress, progressStatus } =
          getStudentProgress(progressData);
        return (
          <S.Student key={id}>
            <span>{index + 1}.</span>
            <span>{getCountryEmoji(countryCode)}</span>
            <span>{t('right_bar.anonymous_user')}</span>
            <S.LastActivity>{getRelativeTime(lastActivity)}</S.LastActivity>
            <S.Progress
              percent={learnProgress}
              status={progressStatus}
              format={(percent) => (
                <S.ProgressPercent>{percent}%</S.ProgressPercent>
              )}
            />
          </S.Student>
        );
      })}
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
  publicId: T.string,
};

export default Students;
