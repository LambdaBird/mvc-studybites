import T from 'prop-types';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';

import MobileContext from '@sb-ui/contexts/MobileContext';
import { NEW_LESSON_ID } from '@sb-ui/pages/Teacher/LessonEdit/constants';
import { LESSONS_EDIT } from '@sb-ui/utils/paths';

import { useLessonActions } from './useLessonActions';
import * as S from './LessonList.styled';

const LessonList = ({ lessons, handleHideLeftBar }) => {
  const { t } = useTranslation('teacher');
  const history = useHistory();
  const { id: currentId } = useParams();
  const isMobile = useContext(MobileContext);

  const selectedLessonRef = useRef(null);
  const handleLessonClick = useCallback(
    (id, state) => {
      history.push(LESSONS_EDIT.replace(':id', id, state));
      if (isMobile) {
        handleHideLeftBar();
      }
    },
    [handleHideLeftBar, history, isMobile],
  );

  const {
    selectedLesson,
    handleCopyLink,
    handleDeleteLesson,
    handleSelectLesson,
    handleVisibleChange,
  } = useLessonActions({ handleLessonClick });

  useEffect(() => {
    selectedLessonRef.current?.scrollIntoViewIfNeeded?.();
  }, [currentId]);

  return (
    <S.Wrapper>
      <S.LessonsTitle>{t('lesson_list.title')}</S.LessonsTitle>
      <S.LessonsList>
        {lessons.map(({ name, id, status }) => (
          <S.Lesson
            ref={currentId === id ? selectedLessonRef : null}
            selected={currentId === id || selectedLesson === id}
            key={id}
            status={status}
            onClick={() => handleLessonClick(id)}
          >
            <S.Badge status={status} />
            <S.Text>{name}</S.Text>
            <S.Popover
              onVisibleChange={handleVisibleChange}
              okText={t('lesson_list.confirm_ok')}
              cancelText={t('lesson_list.confirm_cancel')}
              content={
                <S.ButtonsWrapper>
                  <S.PopoverStyles />
                  <S.Button onClick={(e) => handleDeleteLesson(e, id)}>
                    <DeleteOutlined />
                    <S.ButtonText>
                      {t('lesson_list.delete_lesson')}
                    </S.ButtonText>
                  </S.Button>
                  <S.Button onClick={(e) => handleCopyLink(e, id)}>
                    <CopyOutlined />
                    <S.ButtonText>{t('lesson_list.copy_link')}</S.ButtonText>
                  </S.Button>
                </S.ButtonsWrapper>
              }
            >
              {id !== NEW_LESSON_ID && (
                <S.More
                  selected={id === selectedLesson}
                  onClick={(e) => handleSelectLesson(e, id)}
                />
              )}
            </S.Popover>
          </S.Lesson>
        ))}
      </S.LessonsList>
    </S.Wrapper>
  );
};

LessonList.propTypes = {
  handleHideLeftBar: T.func,
  lessons: T.arrayOf(T.shape({})),
};

export default LessonList;
