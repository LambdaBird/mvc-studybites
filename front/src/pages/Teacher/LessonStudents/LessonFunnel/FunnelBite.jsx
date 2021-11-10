import T from 'prop-types';

import { Bite } from './types';
import * as S from './LessonFunnel.styled';

const FunnelBite = ({ bite, bitesNumber, isFirst }) => {
  const { id, landed, prevLanded, initialLanded } = bite;

  const diffNumber = ((prevLanded - landed) / prevLanded) * 100;
  const studentsChangePercent = !!diffNumber && `-${diffNumber.toFixed(2)}%`;

  return (
    <>
      <S.BiteBarWrapper>
        <S.BiteBar
          title={landed}
          prevLanded={prevLanded}
          landed={landed}
          initialLanded={initialLanded}
          whole={bitesNumber}
          number={id}
        >
          <S.LandedNumber>{landed}</S.LandedNumber>
        </S.BiteBar>
      </S.BiteBarWrapper>
      <S.DiffNumber value={diffNumber || 0}>
        {!isFirst && studentsChangePercent}
      </S.DiffNumber>
    </>
  );
};

FunnelBite.propTypes = {
  bitesNumber: T.number.isRequired,
  isFirst: T.bool.isRequired,
  bite: T.shape(Bite).isRequired,
};

export default FunnelBite;
