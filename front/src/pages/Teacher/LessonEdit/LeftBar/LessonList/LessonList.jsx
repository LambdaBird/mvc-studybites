import { Tooltip } from 'antd';
import T from 'prop-types';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import MobileContext from '@sb-ui/contexts/MobileContext';
import { NEW_LESSON_ID } from '@sb-ui/pages/Teacher/LessonEdit/constants';
import { LESSONS_EDIT } from '@sb-ui/utils/paths';

import { useLessonActions } from './useLessonActions';
import * as S from './LessonList.styled';

const LessonList = ({ title, lessons, actions = [], handleHideLeftBar }) => {
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
    visible,
    selectedLesson,
    handleSelectLesson,
    handleVisibleChange,
    getActionHandlerByName,
  } = useLessonActions();

  useEffect(() => {
    selectedLessonRef.current?.scrollIntoViewIfNeeded?.();
  }, [currentId]);

  return (
    <S.Wrapper>
      <S.LessonsTitle>{title}</S.LessonsTitle>
      <S.LessonsList>
        {lessons.map(({ name, id, status }) => (
          <S.Lesson
            ref={currentId === id ? selectedLessonRef : null}
            selected={currentId === id || selectedLesson === id}
            key={id}
            status={status}
            onClick={() => handleLessonClick(id)}
          >
            <Tooltip arrowPointAtCenter title={status} placement="topLeft">
              <S.Badge status={status} />
            </Tooltip>
            <S.Text>{name}</S.Text>
            <S.Popover
              visible={id === selectedLesson && visible}
              onVisibleChange={handleVisibleChange}
              okText={t('lesson_list.confirm_ok')}
              cancelText={t('lesson_list.confirm_cancel')}
              content={
                <S.ButtonsWrapper>
                  <S.PopoverStyles />
                  {actions.map(({ name: actionName, element }) => (
                    <S.Button
                      key={actionName}
                      onClick={(e) => getActionHandlerByName(actionName)(e, id)}
                    >
                      {element}
                    </S.Button>
                  ))}
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
  title: T.string,
  handleHideLeftBar: T.func,
  lessons: T.arrayOf(T.shape({})),
  actions: T.arrayOf(
    T.shape({
      name: T.string,
      element: T.element,
    }),
  ),
};

export default LessonList;
