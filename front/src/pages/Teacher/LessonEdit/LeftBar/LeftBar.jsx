import T from 'prop-types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import logo from '@sb-ui/resources/img/logo.svg';
import { LESSONS_NEW } from '@sb-ui/utils/paths';

import LessonList from './LessonList';
import * as S from './LeftBar.styled';

const LeftBar = ({ lessons }) => {
  const { t } = useTranslation('teacher');
  const history = useHistory();

  const handleHomeClick = useCallback(() => {
    history.push(LESSONS_NEW);
  }, [history]);

  const handleNewLessonClick = useCallback(() => {
    history.push(LESSONS_NEW);
  }, [history]);

  return (
    <S.Wrapper>
      <S.LogoLink onClick={handleHomeClick}>
        <S.Logo src={logo} alt="Logo" />
      </S.LogoLink>
      <LessonList lessons={lessons} />
      <S.AddNewLessonWrapper onClick={handleNewLessonClick}>
        <PlusOutlined />
        <div>{t('left_bar.add_new_lesson')}</div>
      </S.AddNewLessonWrapper>
    </S.Wrapper>
  );
};

LeftBar.propTypes = {
  lessons: T.arrayOf(T.shape({})),
};

export default LeftBar;
