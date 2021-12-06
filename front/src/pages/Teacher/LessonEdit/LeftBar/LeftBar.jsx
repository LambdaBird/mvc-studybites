import T from 'prop-types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { DoubleLeftOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Button from '@sb-ui/components/atoms/Button';
import MobileContext from '@sb-ui/contexts/MobileContext';
import logo from '@sb-ui/resources/img/logo.svg';
import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import { HOME, LESSONS_NEW } from '@sb-ui/utils/paths';

import LessonList from './LessonList';
import * as S from './LeftBar.styled';

const LeftBar = ({ isOpen, handleHideLeftBar, handleShowLeftBar }) => {
  const { t } = useTranslation('teacher');
  const history = useHistory();
  const isMobile = useContext(MobileContext);
  const [lessons, setLessons] = useState(LessonsStorage.getLessons());
  const handleNewLessonClick = useCallback(() => {
    amplitudeLogEvent(AMPLITUDE_EVENTS.CREATE_LESSON);
    history.push(LESSONS_NEW);
    if (isMobile) {
      handleHideLeftBar();
    }
  }, [handleHideLeftBar, history, isMobile]);

  const handleHideClick = useCallback(
    (e) => {
      e.stopPropagation();
      handleHideLeftBar();
    },
    [handleHideLeftBar],
  );

  useEffect(() => {
    const handleChangeLessons = (newLessons) => {
      setLessons(newLessons);
    };
    LessonsStorage.addChangeHandler(handleChangeLessons);
    return () => {
      LessonsStorage.removeChangeHandler(handleChangeLessons);
    };
  }, []);

  return (
    <>
      <S.Wrapper opened={isOpen}>
        <S.LogoLink>
          <Link to={HOME}>
            <S.Logo src={logo} alt="Logo" />
          </Link>
          <S.HideWrapper onClick={handleHideClick}>
            <DoubleLeftOutlined />
          </S.HideWrapper>
        </S.LogoLink>
        <LessonList lessons={lessons} handleHideLeftBar={handleHideLeftBar} />
        <S.AddNewLessonWrapper onClick={handleNewLessonClick}>
          <S.PlusIcon />
          <div>{t('left_bar.add_new_lesson')}</div>
        </S.AddNewLessonWrapper>
      </S.Wrapper>
      {isMobile && isOpen && <S.CloseArea onClick={handleHideLeftBar} />}
      <S.ShowWrapper opened={isOpen}>
        <Button
          iconComponent={<MenuUnfoldOutlined />}
          onClick={handleShowLeftBar}
        >
          <MenuUnfoldOutlined />
        </Button>
      </S.ShowWrapper>
    </>
  );
};

LeftBar.propTypes = {
  handleHideLeftBar: T.func,
  handleShowLeftBar: T.func,
  isOpen: T.bool,
};

export default LeftBar;
