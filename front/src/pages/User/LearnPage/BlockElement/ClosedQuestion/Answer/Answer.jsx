import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LearnContext from '@sb-ui/contexts/LearnContext';
import {
  BlockIdType,
  QuestionType,
  RevisionType,
} from '@sb-ui/pages/User/LearnPage/BlockElement/types';
import { ChunkWrapper } from '@sb-ui/pages/User/LearnPage/LearnPage.styled';
import {
  interactiveEnter,
  RESPONSE_TYPE,
} from '@sb-ui/pages/User/LearnPage/utils';

import * as S from './Answer.styled';

const Answer = ({ blockId, revision, question }) => {
  const { t } = useTranslation('user');
  const { handleInteractiveClick, id } = useContext(LearnContext);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendButton = () => {
    handleInteractiveClick({
      id,
      action: RESPONSE_TYPE,
      blockId,
      revision,
      reply: { value: input },
    });
  };

  const handleInputKeyDown = (event) => {
    interactiveEnter(event, buttonRef.current, true);
  };

  const handleSendKeyDown = (event) => {
    interactiveEnter(event, inputRef.current, false);
  };

  return (
    <>
      <ChunkWrapper isBottom>
        <S.Question>{question}</S.Question>
      </ChunkWrapper>
      <S.BlockWrapperWhite>
        <S.Textarea
          ref={inputRef}
          value={input}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
          placeholder={t('lesson.input_answer')}
        />
        <S.SendButton
          ref={buttonRef}
          onKeyDown={handleSendKeyDown}
          onClick={handleSendButton}
        >
          <S.RightOutlined />
        </S.SendButton>
      </S.BlockWrapperWhite>
    </>
  );
};

Answer.propTypes = {
  blockId: BlockIdType,
  revision: RevisionType,
  question: QuestionType,
};

export default Answer;
