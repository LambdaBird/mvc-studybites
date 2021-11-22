import T from 'prop-types';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import MobileContext from '@sb-ui/contexts/MobileContext';
import { LESSONS_EDIT } from '@sb-ui/utils/paths';

import * as S from './LessonList.styled';

const LessonList = ({ lessons, handleHideLeftBar }) => {
  const history = useHistory();
  const { id: currentId } = useParams();
  const isMobile = useContext(MobileContext);

  const selectedLessonRef = useRef(null);
  const handleLessonClick = useCallback(
    (id) => {
      history.push(LESSONS_EDIT.replace(':id', id));
      if (isMobile) {
        handleHideLeftBar();
      }
    },
    [handleHideLeftBar, history, isMobile],
  );

  useEffect(() => {
    selectedLessonRef.current?.scrollIntoViewIfNeeded?.();
  }, [currentId]);

  return (
    <S.Wrapper>
      <S.LessonsTitle>LESSONS</S.LessonsTitle>
      <S.LessonsList>
        {lessons.map(({ name, id, status }) => (
          <S.Lesson
            ref={currentId === id ? selectedLessonRef : null}
            selected={currentId === id}
            key={id}
            status={status}
            onClick={() => handleLessonClick(id)}
          >
            <S.Badge status={status} />
            <S.Text>{name}</S.Text>
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
