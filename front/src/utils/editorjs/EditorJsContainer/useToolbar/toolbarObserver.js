import { EDITOR_MOBILE_PX, LEFT_PLUS_POS, UNDO_MARGIN } from './constants';

export const initObserver = (targetNode) => {
  const observer = new window.ResizeObserver((entries) => {
    const newWidth = entries?.[0]?.contentRect?.width;
    if (newWidth - LEFT_PLUS_POS < EDITOR_MOBILE_PX) {
      targetNode.classList.add(UNDO_MARGIN);
    } else {
      targetNode.classList.remove(UNDO_MARGIN);
    }
  });
  observer.observe(targetNode);

  return observer;
};

export const destroyObserver = (observer) => {
  observer.disconnect();
};
