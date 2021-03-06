import { useCallback, useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LearnContext from '@sb-ui/contexts/LearnContext';
import Result from '@sb-ui/pages/User/LearnPage/BlockElement/FillTheGap/Result';
import { verifyAnswers } from '@sb-ui/pages/User/LearnPage/BlockElement/FillTheGap/verifyAnswers';
import {
  BlockContentType,
  BlockIdType,
  FillTheGapBlockAnswerType,
  FillTheGapBlockReplyType,
  RevisionType,
  SolvedType,
} from '@sb-ui/pages/User/LearnPage/BlockElement/types';
import {
  ChunkWrapper,
  LessonButton,
} from '@sb-ui/pages/User/LearnPage/LearnPage.styled';
import {
  interactiveEnter,
  RESPONSE_TYPE,
} from '@sb-ui/pages/User/LearnPage/utils';

import GapsInput from './GapsInput';

const FillTheGap = ({
  blockId,
  revision,
  answer = {},
  content,
  reply = {},
  isSolved,
}) => {
  const { t } = useTranslation('user');
  const sendButtonRef = useRef(null);
  const lastInputRef = useRef(null);
  const { handleInteractiveClick, id } = useContext(LearnContext);

  const { tokens } = content.data || {};

  const [gapsInput, setGapsInput] = useState(
    tokens?.map((token) => {
      const input = reply.response?.find((x) => x.id === token.id);
      return {
        ...token,
        value: input ? input.value : token.value,
      };
    }),
  );

  const handleSendClick = useCallback(() => {
    handleInteractiveClick({
      id,
      action: RESPONSE_TYPE,
      revision,
      blockId,
      reply: {
        response: gapsInput?.filter((gap) => gap.type === 'input'),
      },
    });
  }, [blockId, gapsInput, handleInteractiveClick, id, revision]);

  const handleKeyDown = (event) => {
    interactiveEnter(event, lastInputRef.current, false);
  };

  const { results } = answer;

  const { correct, result } = verifyAnswers(results, reply.response);

  return (
    <>
      <ChunkWrapper>
        <GapsInput
          sendButtonRef={sendButtonRef}
          lastInputRef={lastInputRef}
          gaps={gapsInput}
          setGaps={setGapsInput}
          disabled={isSolved}
        />
      </ChunkWrapper>
      {isSolved ? (
        <ChunkWrapper>
          <Result correct={correct} result={result} gaps={gapsInput} />
        </ChunkWrapper>
      ) : (
        <LessonButton
          ref={sendButtonRef}
          onClick={handleSendClick}
          onKeyDown={handleKeyDown}
        >
          {t('lesson.send')}
        </LessonButton>
      )}
    </>
  );
};

FillTheGap.propTypes = {
  blockId: BlockIdType,
  revision: RevisionType,
  content: BlockContentType,
  answer: FillTheGapBlockAnswerType,
  reply: FillTheGapBlockReplyType,
  isSolved: SolvedType,
};

export default FillTheGap;
