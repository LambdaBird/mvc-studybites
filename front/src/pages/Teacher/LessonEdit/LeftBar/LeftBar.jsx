import T from 'prop-types';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { DoubleLeftOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Button from '@sb-ui/components/atoms/Button';
import MobileContext from '@sb-ui/contexts/MobileContext';
import { PlusOutlined } from '@sb-ui/resources/icons';
import logo from '@sb-ui/resources/img/logo.svg';
import { LESSONS_NEW } from '@sb-ui/utils/paths';

import LessonList from './LessonList';
import * as S from './LeftBar.styled';

const LeftBar = ({ isOpen, lessons, handleHideLeftBar, handleShowLeftBar }) => {
  const { t } = useTranslation('teacher');
  const history = useHistory();
  const isMobile = useContext(MobileContext);

  const handleNewLessonClick = useCallback(() => {
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

  return (
    <>
      <S.Wrapper opened={isOpen}>
        <S.LogoLink onClick={handleNewLessonClick}>
          <S.Logo src={logo} alt="Logo" />
          <S.HideWrapper onClick={handleHideClick}>
            <DoubleLeftOutlined />
          </S.HideWrapper>
        </S.LogoLink>
        <LessonList lessons={lessons} handleHideLeftBar={handleHideLeftBar} />
        <S.AddNewLessonWrapper onClick={handleNewLessonClick}>
          <PlusOutlined />
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
  lessons: T.arrayOf(T.shape({})),
};

export default LeftBar;
