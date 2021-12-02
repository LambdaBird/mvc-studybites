import {
  CE_INLINE_TOOLBAR,
  CE_TOOLBAR_ACTIONS,
  DISPLAY_NONE,
  EDITOR_PLUS_TOOLBAR,
} from './constants';

const moveActionsButtons = (parent) => {
  if (!parent?.querySelector(`.${CE_TOOLBAR_ACTIONS}`)) {
    const actionsButton = document.querySelector(`.${CE_TOOLBAR_ACTIONS}`);
    if (actionsButton) {
      parent.appendChild(actionsButton);
    }
  }
};

export const moveActionsButtonsToMobile = () => {
  const parent = document.querySelector(`.${EDITOR_PLUS_TOOLBAR}`);
  moveActionsButtons(parent);
};

export const createToolbar = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(DISPLAY_NONE);
  wrapper.classList.add(EDITOR_PLUS_TOOLBAR);
  wrapper.classList.add(CE_INLINE_TOOLBAR);
  return wrapper;
};

export const setTransform3d = (element, { x = 0, y = 0, z = 0 }) => {
  // eslint-disable-next-line no-param-reassign
  element.style.transform = `translate3d(${x.toFixed(0)}px,${y.toFixed(
    0,
  )}px,${z.toFixed(0)}px)`;
};

export const isHaveParentElement = (element, parentElement) => {
  if (!element) {
    return false;
  }
  if (element === parentElement) {
    return true;
  }
  return isHaveParentElement(element?.parentElement, parentElement);
};

export const focusElement = (element) => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.setStart(element, 0);
  range.setEnd(element, 0);
  selection.removeAllRanges();
  selection.addRange(range);
};
