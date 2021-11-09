import T from 'prop-types';
import { useTranslation } from 'react-i18next';

import { getCountryEmoji } from './countryUtil';
import { getRelativeTime } from './timeUtil';
import * as S from './Student.styled';

const Students = ({ students }) => {
  const { t } = useTranslation('teacher');
  return (
    <S.Wrapper>
      {students?.map(
        ({ id, countryCode = 'XX', lastActivity, progress = 0 }, index) => (
          <S.Student key={id}>
            <span>{index + 1}.</span>
            <span>{getCountryEmoji(countryCode)}</span>
            <span>{t('right_bar.anonymous_user')}</span>
            <S.LastActivity>{getRelativeTime(lastActivity)}</S.LastActivity>
            <S.Progress
              percent={progress * 100}
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
