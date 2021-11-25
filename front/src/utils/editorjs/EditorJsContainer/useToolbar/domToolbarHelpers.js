import {
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
  const s = window.getSelection();
  const r = document.createRange();
  if (element?.innerText?.trim?.()?.length === 0) {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = '\u00a0';
    r.selectNodeContents(element);
    document.execCommand('delete', false, null);
  } else {
    r.setStart(element, 0);
    r.setEnd(element, 0);
  }
  s.removeAllRanges();
  s.addRange(r);
};
