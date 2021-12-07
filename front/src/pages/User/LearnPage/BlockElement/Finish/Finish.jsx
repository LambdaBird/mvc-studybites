import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import LearnContext from '@sb-ui/contexts/LearnContext';
import Results from '@sb-ui/pages/User/LearnPage/BlockElement/Results';
import * as S from '@sb-ui/pages/User/LearnPage/LearnPage.styled';
import { FINISH_TYPE } from '@sb-ui/pages/User/LearnPage/utils';

import { NextPropType } from '../types';

import ThumbUp from './ThumbUp';
import { Wrapper } from './Finish.styled';

const Finish = ({ isSolved }) => {
  const { t } = useTranslation('user');
  const { handleInteractiveClick, id } = useContext(LearnContext);

  if (isSolved) {
    return (
      <Wrapper>
        <Results />
        <ThumbUp />
      </Wrapper>
    );
  }

  return (
    <S.LessonButton
      onClick={() => handleInteractiveClick({ id, action: FINISH_TYPE })}
    >
      {t('user:lesson.finish')}
    </S.LessonButton>
  );
};

Finish.propTypes = NextPropType;

export default Finish;
