import T from 'prop-types';
import { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { LESSONS_EDIT } from '@sb-ui/utils/paths';

import * as S from './LessonList.styled';

const LEARN_LINK = `http://localhost:3018/learn/`;

// This component is just for demonstrating lessons list Proof of Concept (stored in local storage)
// It will be changed cardinally with adding left side bar
const LessonList = ({ lessons, publicId }) => {
  const history = useHistory();
  const handleLessonClick = useCallback(
    (id) => {
      history.replace(LESSONS_EDIT.replace(':id', id));
    },
    [history],
  );

  return (
    <S.Wrapper>
      {lessons.map(({ name, id, status }) => (
        <S.Lesson
          key={id}
          status={status}
          onClick={() => handleLessonClick(id)}
        >
          {name}
        </S.Lesson>
      ))}
      {publicId && (
        <div>
          Link to public:
          <br />
          <Link to={`/learn/${publicId}`}>
            {LEARN_LINK}
            {publicId}
          </Link>
        </div>
      )}
    </S.Wrapper>
  );
};

LessonList.propTypes = {
  publicId: T.string,
  lessons: T.arrayOf(T.shape({})),
};

export default LessonList;
