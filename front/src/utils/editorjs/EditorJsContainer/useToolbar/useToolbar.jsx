import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { CODEX_EDITOR, CODEX_EDITOR_REDACTOR } from './constants';
import {
  createToolbar,
  moveActionsButtonsToDesktop,
  moveActionsButtonsToMobile,
} from './domToolbarHelpers';
import Toolbar from './Toolbar';
import { useEditorMobile } from './useEditorMobile';

const toolbarWrapper = createToolbar();

export const useToolbar = ({ editor }) => {
  const isMobile = useEditorMobile();
  const [isReady, setIsReady] = useState(false);
  const editorElementRef = useRef(null);
  const toolbarRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const func = useCallback(
    ({ notClose } = {}) => {
      if (!notClose) {
        setIsOpen(false);
      }
      const { blocks } = editor.current;
      const currentIndex = blocks.getCurrentBlockIndex();
      const block = blocks.getBlockByIndex(currentIndex);
      const bodyRect = editorElementRef.current.getBoundingClientRect();
      const elemRect = block?.holder?.getBoundingClientRect();
      const offset = elemRect.top - bodyRect.top;
      const realOffset = offset + 2;
      toolbarWrapper.style.transform = `translate3d(-25px,${realOffset.toFixed(
        0,
      )}px,0px)`;
      toolbarWrapper.classList.remove('d-none');
    },
    [editor],
  );

  const handleInsertBlockClick = useCallback(
    (block) => {
      const { blocks, caret } = editor.current;
      blocks.insert(block);
      const currentIndex = blocks.getCurrentBlockIndex();
      blocks.delete(currentIndex - 1);
      caret.setToBlock(currentIndex - 1);
      func();
    },
    [func, editor],
  );

  const handlePlusClick = useCallback(() => {
    setIsOpen((prev) => {
      if (prev === false) {
        const { blocks, caret } = editor.current;

        const currentBlock = blocks.getBlockByIndex(
          blocks.getCurrentBlockIndex(),
        );
        if (!currentBlock?.isEmpty) {
          blocks.insert('paragraph');
          const currentIndex = blocks.getCurrentBlockIndex();
          caret.setToBlock(currentIndex);
          func({ notClose: true });
        }
        return true;
      }
      func();
      return false;
    });
  }, [editor, func]);

  const renderToolbar = useCallback(() => {
    ReactDOM.render(
      <Toolbar
        handlePlusClick={handlePlusClick}
        handleInsertBlockClick={handleInsertBlockClick}
        isOpen={isOpen}
      />,
      toolbarRef.current,
      () => {
        if (isMobile) {
          moveActionsButtonsToMobile();
        }
      },
    );
  }, [handleInsertBlockClick, handlePlusClick, isMobile, isOpen]);

  useEffect(() => {
    if (!isReady) {
      return () => {};
    }
    const parent = document.querySelector(`.${CODEX_EDITOR}`);
    const editorElement = document.querySelector(`.${CODEX_EDITOR_REDACTOR}`);
    editorElementRef.current = editorElement;
    toolbarRef.current = toolbarWrapper;
    renderToolbar();
    parent?.insertAdjacentElement('beforeend', toolbarWrapper);

    editorElement?.addEventListener('mousedown', func);
    editorElement?.addEventListener('keydown', func);

    return () => {
      editorElement?.removeEventListener('mousedown', func);
      editorElement?.removeEventListener('keydown', func);
    };
  }, [isReady, editor, func, renderToolbar]);

  useEffect(() => {
    if (toolbarRef.current) {
      renderToolbar();
    }
  }, [isMobile, renderToolbar]);

  const prepareToolbar = useCallback(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isMobile) {
      moveActionsButtonsToMobile();
    } else {
      moveActionsButtonsToDesktop();
    }
  }, [isMobile]);

  return { prepareToolbar };
};
