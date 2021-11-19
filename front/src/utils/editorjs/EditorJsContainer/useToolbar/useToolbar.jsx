import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { CODEX_EDITOR, CODEX_EDITOR_REDACTOR, DISPLAY_NONE } from './constants';
import {
  createToolbar,
  moveActionsButtonsToDesktop,
  moveActionsButtonsToMobile,
  setTransform3d,
} from './domToolbarHelpers';
import Toolbar from './Toolbar';
import { getCurrentBlock } from './toolbarHelpers';
import { useEditorMobile } from './useEditorMobile';

const toolbarWrapper = createToolbar();

export const useToolbar = ({ editor }) => {
  const isMobile = useEditorMobile();
  const [isReady, setIsReady] = useState(false);
  const editorElementRef = useRef(null);
  const toolbarRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = useCallback(
    ({ stayOpen } = {}) => {
      if (!stayOpen) {
        setIsOpen(false);
      }
      const block = getCurrentBlock(editor.current);
      const bodyRect = editorElementRef.current.getBoundingClientRect();
      const elemRect = block?.holder?.getBoundingClientRect();
      const offset = elemRect.top - bodyRect.top;
      const realOffset = offset + 2;
      setTransform3d(toolbarWrapper, {
        x: -25,
        y: realOffset,
        z: 0,
      });
      toolbarWrapper.classList.remove(DISPLAY_NONE);
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
      handleFocus();
    },
    [handleFocus, editor],
  );

  const handlePlusClick = useCallback(() => {
    setIsOpen((prev) => {
      if (prev === false) {
        const { blocks, caret } = editor.current;
        const currentBlock = getCurrentBlock(editor.current);
        if (!currentBlock?.isEmpty) {
          blocks.insert('paragraph');
          const currentIndex = blocks.getCurrentBlockIndex();
          caret.setToBlock(currentIndex);
          handleFocus({ stayOpen: true });
        }
        return true;
      }
      handleFocus();
      return false;
    });
  }, [editor, handleFocus]);

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

    editorElement?.addEventListener('mousedown', handleFocus);
    editorElement?.addEventListener('keydown', handleFocus);

    return () => {
      editorElement?.removeEventListener('mousedown', handleFocus);
      editorElement?.removeEventListener('keydown', handleFocus);
    };
  }, [isReady, editor, handleFocus, renderToolbar]);

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
