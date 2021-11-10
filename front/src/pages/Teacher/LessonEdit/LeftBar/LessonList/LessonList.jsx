import T from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { LESSONS_EDIT } from '@sb-ui/utils/paths';

import * as S from './LessonList.styled';

const LessonList = ({ lessons }) => {
  const history = useHistory();
  const { id: currentId } = useParams();

  const selectedLessonRef = useRef(null);
  const handleLessonClick = useCallback(
    (id) => {
      history.push(LESSONS_EDIT.replace(':id', id));
    },
    [history],
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
  lessons: T.arrayOf(T.shape({})),
};

export default LessonList;
