import { focusElement } from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbar/domToolbarHelpers';
import { findFirstInput } from '@sb-ui/utils/editorjs/utils';

import { CE_BLOCK, CE_PARAGRAPH, START_TITLE } from './constants';

export const getParentWithClassName = (element, className) => {
  if (!element) {
    return null;
  }
  if (element.classList.contains(className)) {
    return element;
  }
  return getParentWithClassName(element?.parentElement, className);
};

export const getActiveBlockIndex = (block) => {
  if (block) {
    const activeBlock = getParentWithClassName(block, CE_BLOCK);
    if (activeBlock) {
      return [...activeBlock.parentElement.childNodes].findIndex(
        (element) => element === activeBlock,
      );
    }
  }
  return -1;
};

export const getCorrectBlockIndex = (editor, block) => {
  const editorCurrentIndex = editor.current.blocks.getCurrentBlockIndex();
  if (!block) {
    return editorCurrentIndex;
  }
  const activeIndex = getActiveBlockIndex(block);
  if (activeIndex === -1 || activeIndex === editorCurrentIndex) {
    return editorCurrentIndex;
  }

  return activeIndex;
};

export const focusAfterDeletion = ({
  editor,
  indexAfterDeletion,
  event,
  handleFocus,
}) => {
  const { getBlockByIndex } = editor?.current?.blocks;
  const block =
    getBlockByIndex(indexAfterDeletion) ||
    getBlockByIndex(indexAfterDeletion - 1);
  if (block?.holder) {
    event.preventDefault();
    const inputElement = findFirstInput(block.holder);
    if (inputElement) {
      focusElement(inputElement);
    }
    handleFocus({ forceBlock: block.holder });
  } else {
    handleFocus();
  }
};

const getFirstBlockFromRedactor = (redactor) =>
  redactor?.childNodes?.[0]?.childNodes?.[0]?.childNodes?.[0];

export const removeStartTitle = (redactor) => {
  const block = getFirstBlockFromRedactor(redactor);
  block?.classList?.remove?.(START_TITLE);
};

export const addStartTitle = (redactor) => {
  if (redactor.childNodes.length !== 1) {
    return;
  }
  const block = getFirstBlockFromRedactor(redactor);
  if (block?.classList?.contains?.(CE_PARAGRAPH)) {
    if (block.childNodes?.[0]?.innerText.length === 0) {
      block.classList.add(START_TITLE);
    }
  }
};
