import T from 'prop-types';
import { useCallback } from 'react';
import { EnterOutlined } from '@ant-design/icons';

import { moveCaretToEnd } from '@sb-ui/utils/editorjs/toolsHelper';
import { setPropsInTool } from '@sb-ui/utils/editorjs/utils';

import * as S from './BricksComponent.styled';

export const TagInput = ({
  placeholder,
  addNewWord,
  moveBackInput,
  inputRef,
}) => {
  const handleEnterButtonClick = useCallback(() => {
    const word = inputRef.current.value?.trim?.() || '';
    if (word) {
      addNewWord(word);
    }
    setPropsInTool(inputRef.current, {
      value: '',
    });
  }, [addNewWord, inputRef]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.code === 'Enter') {
        handleEnterButtonClick();
      }
      if (event.code === 'Backspace' && inputRef.current.value.length === 0) {
        moveBackInput.current?.focus?.();
        if (moveBackInput.current.nodeName === 'DIV') {
          event.preventDefault();
          moveCaretToEnd(moveBackInput.current);
        }
      }
    },
    [handleEnterButtonClick, inputRef, moveBackInput],
  );

  return (
    <S.TagWrapper>
      <S.RealInput
        onKeyDown={handleKeyDown}
        ref={inputRef}
        placeholder={placeholder}
      />
      <S.EnterButton onClick={handleEnterButtonClick}>
        <EnterOutlined />
      </S.EnterButton>
    </S.TagWrapper>
  );
};

TagInput.propTypes = {
  inputRef: T.oneOfType([T.func, T.shape({ current: T.instanceOf(Element) })]),
  placeholder: T.string,
  addNewWord: T.func,
  moveBackInput: T.oneOfType([
    T.func,
    T.shape({ current: T.instanceOf(Element) }),
  ]),
};
