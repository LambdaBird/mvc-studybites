import T from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import * as S from './BricksComponent.styled';

const MAX_ANSWER_LENGTH = 50;
export const Words = ({ words, removeWord, empty }) => (
  <S.WordsWrapper>
    {words.map((word) => (
      <S.Word key={word}>
        <span>
          {word?.length > MAX_ANSWER_LENGTH
            ? `${word.slice(0, MAX_ANSWER_LENGTH)}...`
            : word}
        </span>
        <S.WordDelete
          onClick={() => {
            removeWord(word);
          }}
        >
          <CloseOutlined />
        </S.WordDelete>
      </S.Word>
    ))}
    {words.length === 0 && <S.NoWord>{empty}</S.NoWord>}
  </S.WordsWrapper>
);

Words.propTypes = {
  words: T.arrayOf(T.string),
  empty: T.string,
  removeWord: T.func,
};
