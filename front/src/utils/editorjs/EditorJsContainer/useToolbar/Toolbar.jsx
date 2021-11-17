import T from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import {
  getBaseBlocks,
  getInteractiveBlocks,
} from '@sb-ui/pages/Teacher/LessonEdit/utils';
import * as S from '@sb-ui/utils/editorjs/EditorJsContainer/EditorJsContainer.styled';
import { Block } from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbar/Block';

const baseBlocks = getBaseBlocks(() => {});
const interactiveBlocks = getInteractiveBlocks(() => {});

const Toolbar = ({ isOpen, handlePlusClick, handleInsertBlockClick }) => (
  <>
    <S.PlusToolbar active={isOpen} onClick={handlePlusClick}>
      <PlusOutlined />
    </S.PlusToolbar>
    {isOpen && (
      <S.ToolbarWrapper>
        <S.BlocksTitle>Basic blocks</S.BlocksTitle>
        <S.Blocks>
          {Object.keys(baseBlocks).map((block) => (
            <Block
              key={block}
              onClick={() => handleInsertBlockClick(block)}
              block={block}
              blocks={baseBlocks}
            />
          ))}
        </S.Blocks>
        <S.InteractiveBlocksTitle>Interactive blocks</S.InteractiveBlocksTitle>
        <S.Blocks>
          {Object.keys(interactiveBlocks).map((block) => (
            <Block
              key={block}
              onClick={() => handleInsertBlockClick(block)}
              block={block}
              blocks={interactiveBlocks}
            />
          ))}
        </S.Blocks>
      </S.ToolbarWrapper>
    )}
  </>
);

Toolbar.propTypes = {
  isOpen: T.bool,
  handlePlusClick: T.func,
  handleInsertBlockClick: T.func,
};

export default Toolbar;
