import T from 'prop-types';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import MobileContext from '@sb-ui/contexts/MobileContext';
import { NEW_LESSON_ID } from '@sb-ui/pages/Teacher/LessonEdit/constants';
import { LESSONS_EDIT } from '@sb-ui/utils/paths';

import { useLessonRemove } from './useLessonRemove';
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
    handleCancelDelete,
    handleConfirmDelete,
    handleLessonRemove,
    handleVisibleChange,
  } = useLessonRemove({ handleLessonClick });

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
            <S.PopConfirm
              title={t('lesson_list.confirm_title')}
              onConfirm={(e) => handleConfirmDelete(e, id)}
              onCancel={handleCancelDelete}
              onVisibleChange={handleVisibleChange}
              okText={t('lesson_list.confirm_ok')}
              cancelText={t('lesson_list.confirm_cancel')}
            >
              {id !== NEW_LESSON_ID && (
                <S.Close
                  selected={id === selectedLesson}
                  onClick={(e) => handleLessonRemove(e, id)}
                />
              )}
            </S.PopConfirm>
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
