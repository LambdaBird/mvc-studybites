import {
  CE_TOOLBAR_ACTIONS,
  CE_TOOLBAR_CONTENT,
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

export const moveActionsButtonsToDesktop = () => {
  const parent = document.querySelector(`.${CE_TOOLBAR_CONTENT}`);
  moveActionsButtons(parent);
};

export const createToolbar = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('d-none');
  wrapper.classList.add('editor-plus-toolbar');
  return wrapper;
};
