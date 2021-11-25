import { HEADER_HEIGHT } from '@sb-ui/components/molecules/Header/Header.styled';
import { TOOLBOX_UPPER } from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbox/constants';

import { BLOCK_BUTTONS } from '../useToolbar/constants';

export const appendItems = ({ node, items = [] }) => {
  items.forEach((item) => {
    node?.appendChild(item);
  });
};

export const getToolboxItems = (parent) =>
  parent?.querySelectorAll(BLOCK_BUTTONS) || [];

export const TOP_OVERLAPS = 'top';
export const BOTTOM_OVERLAPS = 'bottom';

export const getElementOverlapsPosition = (el) => {
  const { top, height, bottom } = el.getBoundingClientRect();
  if (top < HEADER_HEIGHT || window.innerHeight < height * 2 + HEADER_HEIGHT) {
    return TOP_OVERLAPS;
  }
  if (bottom > (window.innerHeight || document.documentElement.clientHeight)) {
    return BOTTOM_OVERLAPS;
  }

  return null;
};

export const toggleToolboxPosition = (element, position) => {
  if (position === BOTTOM_OVERLAPS) {
    element.classList.add(TOOLBOX_UPPER);
  } else {
    element.classList.remove(TOOLBOX_UPPER);
  }
};
