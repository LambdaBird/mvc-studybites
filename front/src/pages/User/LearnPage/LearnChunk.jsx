import * as T from 'prop-types';

import BlockElement from '@sb-ui/pages/User/LearnPage/BlockElement';

import ErrorBoundary from './BlockElement/ErrorBoundary';
import * as S from './LearnPage.styled';

const LearnChunk = ({ chunk }) => {
  const staticBlocks = chunk?.slice(0, -1);
  const interactiveBlock = chunk?.[chunk.length - 1];

  return (
    <>
      {staticBlocks?.length > 0 && (
        <S.ChunkWrapper>
          {staticBlocks.map((block) => (
            <ErrorBoundary key={block.blockId}>
              <BlockElement element={block} />
            </ErrorBoundary>
          ))}
        </S.ChunkWrapper>
      )}
      <ErrorBoundary>
        <BlockElement element={interactiveBlock} />
      </ErrorBoundary>
    </>
  );
};

LearnChunk.propTypes = {
  chunk: T.arrayOf(T.object).isRequired,
};

export default LearnChunk;
