import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { getToolboxItems } from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbox/domToolboxHelpers';

import {
  CODEX_EDITOR,
  CODEX_EDITOR_REDACTOR,
  DISPLAY_NONE,
  LEFT_PLUS_POS,
  NONE_EVENTS,
} from './constants';
import {
  createToolbar,
  isHaveParentElement,
  moveActionsButtonsToMobile,
  setTransform3d,
} from './domToolbarHelpers';
import Toolbar from './Toolbar';
import { getCurrentBlock } from './toolbarHelpers';
import { destroyObserver, initObserver } from './toolbarObserver';
import { useEditorMobile } from './useEditorMobile';

const toolbarWrapper = createToolbar();

export const useToolbar = ({ editor }) => {
  const isMobile = useEditorMobile();
  const [isReady, setIsReady] = useState(false);
  const editorElementRef = useRef(null);
  const toolbarRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const itemsRef = useRef(null);

  const handleFocus = useCallback(
    ({ stayOpen } = {}) => {
      if (!stayOpen) {
        setIsOpen(false);
      }
      const block = getCurrentBlock(editor.current);
      const bodyRect = editorElementRef.current.getBoundingClientRect();
      const elemRect = block?.holder?.getBoundingClientRect();
      if (!elemRect) {
        return;
      }
      const offset = elemRect?.top - bodyRect?.top;
      const realOffset = offset + 2;
      setTransform3d(toolbarWrapper, {
        x: -LEFT_PLUS_POS,
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
      amplitudeLogEvent(AMPLITUDE_EVENTS.BLOCK_ADDED, block);
    },
    [handleFocus, editor],
  );

  const handlePlusClick = useCallback(
    ({ forceClose } = {}) => {
      if (!editor.current) {
        return;
      }
      setIsOpen((prev) => {
        if (prev === false && !forceClose) {
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
        const { blocks, caret } = editor.current;

        const currentIndex = blocks.getCurrentBlockIndex();
        caret.setToBlock(currentIndex);
        handleFocus();
        return false;
      });
    },
    [editor, handleFocus],
  );

  const handleMouseDown = useCallback(
    (event) => {
      if (toolbarWrapper.classList.contains('none-events')) {
        const isInToolbar = isHaveParentElement(event.target, toolbarWrapper);
        if (event.target.parentElement === toolbarWrapper || !isInToolbar) {
          handlePlusClick({ forceClose: true });
        }
      }
    },
    [handlePlusClick],
  );

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case 'Tab':
          if (!isOpen) {
            editor.current.toolbar.toggleBlockSettings(0);
            handlePlusClick();
          }
          break;
        case 'Escape':
          handlePlusClick({ forceClose: true });
          break;
        default:
          break;
      }
    },
    [editor, handlePlusClick, isOpen],
  );

  useEffect(() => {
    if (isOpen) {
      toolbarRef.current?.classList?.add?.(NONE_EVENTS);
    } else {
      toolbarRef.current?.classList?.remove?.(NONE_EVENTS);
    }
  }, [isMobile, isOpen]);

  const renderToolbar = useCallback(() => {
    ReactDOM.render(
      <Toolbar
        handlePlusClick={handlePlusClick}
        handleInsertBlockClick={handleInsertBlockClick}
        isOpen={isOpen}
      />,
      toolbarRef.current,
      () => {
        moveActionsButtonsToMobile();
      },
    );
  }, [handleInsertBlockClick, handlePlusClick, isOpen]);

  useEffect(() => {
    if (!isReady) {
      return () => {};
    }
    const parent = document.querySelector(`.${CODEX_EDITOR}`);
    const editorElement = document.querySelector(`.${CODEX_EDITOR_REDACTOR}`);

    editorElementRef.current = editorElement;
    toolbarRef.current = toolbarWrapper;
    itemsRef.current = Array.from(getToolboxItems(editorElement));
    const observer = initObserver(toolbarWrapper);
    renderToolbar();
    window.addEventListener('mousedown', handleMouseDown);
    parent?.insertAdjacentElement('beforeend', toolbarWrapper);
    parent?.addEventListener?.('keydown', handleKeyDown);
    editorElement?.addEventListener('mousedown', handleFocus);
    editorElement?.addEventListener('keydown', handleFocus);
    return () => {
      destroyObserver(observer);
      window.removeEventListener('mousedown', handleMouseDown);
      editorElement?.removeEventListener('mousedown', handleFocus);
      editorElement?.removeEventListener('keydown', handleFocus);
      parent?.removeEventListener?.('keydown', handleKeyDown);
    };
  }, [
    isReady,
    editor,
    handleFocus,
    renderToolbar,
    handleKeyDown,
    handleMouseDown,
  ]);

  useEffect(() => {
    if (toolbarRef.current) {
      renderToolbar();
    }
  }, [isMobile, renderToolbar]);

  const prepareToolbar = useCallback(() => {
    setIsReady(true);
  }, []);

  return { prepareToolbar, handleFocus };
};
