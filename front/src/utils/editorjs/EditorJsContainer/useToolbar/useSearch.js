import { useCallback, useEffect, useRef, useState } from 'react';

import {
  KEYS,
  TOOLBOX_ACTIVE_CLASS,
} from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbox/constants';
import { getSelectingIndexes } from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbox/toolboxItemsHelpers';

export const useSearch = ({
  baseBlocks,
  interactiveBlocks,
  isOpen,
  value,
  handleInsertBlockClick,
}) => {
  const allBlocks = useRef(null);
  const [currentBlock, setCurrentBlock] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const blocks = document.querySelectorAll('.block-buttons');
      allBlocks.current = blocks;
      [...blocks].forEach((block) => {
        block.classList.remove(TOOLBOX_ACTIVE_CLASS);
      });
      blocks?.[0]?.classList?.add?.(TOOLBOX_ACTIVE_CLASS);
    }
  }, [isOpen, value]);

  const moveSelection = useCallback(
    (position) => {
      const [fromIndex, toIndex] = getSelectingIndexes(
        currentBlock,
        [...allBlocks.current],
        position === 'next',
      );

      const blocks = [...allBlocks.current];
      if (fromIndex !== -1) {
        blocks[fromIndex].classList.remove(TOOLBOX_ACTIVE_CLASS);
      }
      setCurrentBlock(blocks[toIndex].dataset.tool);
      blocks[toIndex].classList.add(TOOLBOX_ACTIVE_CLASS);
      blocks[toIndex].scrollIntoViewIfNeeded?.();
    },
    [currentBlock],
  );

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.code) {
        case KEYS.ARROW_UP:
          moveSelection('prev');
          break;
        case KEYS.ARROW_DOWN:
          moveSelection('next');
          break;
        case KEYS.TAB:
          if (e.shiftKey === true) {
            moveSelection('prev');
          } else {
            moveSelection('next');
          }
          break;
        case KEYS.ENTER:
          handleInsertBlockClick(currentBlock);
          break;
        default:
          break;
      }
    },
    [currentBlock, handleInsertBlockClick, moveSelection],
  );

  useEffect(() => {
    const firstBlock = baseBlocks?.[0] || interactiveBlocks?.[0];
    setCurrentBlock(firstBlock);
  }, [baseBlocks, interactiveBlocks]);

  return { handleKeyDown };
};
