import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { TOOLBOX_MOVE_KEYS } from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbox/constants';
import { getToolboxItems } from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbox/domToolboxHelpers';

import {
  CE_BLOCK_SELECTED,
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
import {
  addStartTitle,
  focusAfterDeletion,
  getCorrectBlockIndex,
  removeStartTitle,
} from './editorHelpers';
import Toolbar from './Toolbar';
import { getCurrentBlock } from './toolbarHelpers';
import { destroyObserver, initObserver } from './toolbarObserver';
import { useEditorMobile } from './useEditorMobile';

const toolbarWrapper = createToolbar();

export const useToolbar = ({ editor, toolbarRef: toolbarTool }) => {
  const isMobile = useEditorMobile();
  const [isReady, setIsReady] = useState(false);
  const editorElementRef = useRef(null);
  const toolbarRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const itemsRef = useRef(null);

  const handleFocus = useCallback(
    ({ stayOpen, forceBlock } = {}) => {
      if (!stayOpen) {
        setIsOpen(false);
      }
      const editorCurrentIndex = getCorrectBlockIndex(editor, forceBlock);
      const block = editor.current.blocks.getBlockByIndex(editorCurrentIndex);
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

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    toolbarTool.current.handleFocus = handleFocus;
    // eslint-disable-next-line no-param-reassign
    toolbarTool.current.removeHideTitle = () => {
      removeStartTitle(editorElementRef.current);
    };
  }, [handleFocus, toolbarTool]);

  const hideToolbar = useCallback(() => {
    toolbarWrapper.classList.add(DISPLAY_NONE);
  }, []);

  const editorMouseDown = useCallback(() => {
    setImmediate(() => {
      handleFocus({ forceBlock: document.activeElement });
      removeStartTitle(editorElementRef.current);
    });
  }, [handleFocus]);

  const handleInsertBlockClick = useCallback(
    (block) => {
      const { blocks, caret } = editor.current;
      blocks.insert(block);
      const currentIndex = blocks.getCurrentBlockIndex();
      blocks.delete(currentIndex - 1);
      caret.setToBlock(currentIndex - 1);
      handleFocus();
      amplitudeLogEvent(AMPLITUDE_EVENTS.BLOCK_ADDED, { type: block });
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

  const handleBackspace = useCallback((event) => {
    if (event.key === 'Backspace') {
      const selectedBlocks = [
        ...editorElementRef.current.querySelectorAll(`.${CE_BLOCK_SELECTED}`),
      ].map((element) => {
        const index = [...editorElementRef.current.childNodes].findIndex(
          (x) => x === element,
        );
        return { block: editor.current.blocks.getBlockByIndex(index), index };
      });
      if (selectedBlocks.length > 0) {
        event.stopPropagation();
      }

      if (selectedBlocks.length === editor.current.blocks.getBlocksCount()) {
        editor.current.clear();
        toolbarWrapper.classList.add(DISPLAY_NONE);
        return;
      }

      const indexAfterDeletion = selectedBlocks?.[0]?.index;
      selectedBlocks
        .reverse()
        .forEach(({ index }) => editor.current.blocks.delete(index));
      if (indexAfterDeletion >= 0) {
        focusAfterDeletion({ editor, indexAfterDeletion, event, handleFocus });
      }
    }
    // EditorJS instance ref is passing (creating with useRef())
    // No need passing to useCallback dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditorKeyDown = useCallback(
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

  const handleEditorElementKeyDown = useCallback(
    (event) => {
      if (TOOLBOX_MOVE_KEYS.includes(event.key)) {
        handleFocus();
      }
    },
    [handleFocus],
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
    parent?.insertAdjacentElement('beforeend', toolbarWrapper);
    window.addEventListener('mousedown', handleMouseDown);
    window?.addEventListener?.('keydown', handleBackspace, true);
    parent?.addEventListener?.('keydown', handleEditorKeyDown);
    editorElement?.addEventListener('mousedown', editorMouseDown);
    editorElement?.addEventListener('keydown', handleEditorElementKeyDown);
    return () => {
      destroyObserver(observer);
      window.removeEventListener('mousedown', handleMouseDown);
      window?.addEventListener?.('keydown', handleBackspace, true);
      parent?.removeEventListener?.('keydown', handleEditorKeyDown);
      editorElement?.removeEventListener('mousedown', editorMouseDown);
      editorElement?.removeEventListener('keydown', handleEditorElementKeyDown);
    };
  }, [
    isReady,
    editor,
    handleFocus,
    renderToolbar,
    handleBackspace,
    handleEditorKeyDown,
    handleMouseDown,
    editorMouseDown,
    handleEditorElementKeyDown,
  ]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (editorElementRef.current) {
      addStartTitle(editorElementRef.current);
    }
  }, [isReady]);

  useEffect(() => {
    if (toolbarRef.current) {
      renderToolbar();
    }
  }, [isMobile, renderToolbar]);

  useEffect(
    () => () => {
      // when toolbar unmounted set isReady to false, need for React hotReload works properly
      setIsReady(false);
    },
    [],
  );

  const prepareToolbar = useCallback(() => {
    setIsReady(true);
  }, []);

  return { prepareToolbar, handleFocus, hideToolbar };
};
