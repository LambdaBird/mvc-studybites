export const getTranslationKey = (name) => {
  switch (name) {
    case 'fillTheGap':
      return 'fill_the_gap';
    case 'closedQuestion':
      return 'closed_question';
    case 'gradedQuestion':
      return 'graded_question';
    default:
      return name;
  }
};

/**
 * Get selecting indexes of toolbox
 * @returns {Array.<Number>} [fromIndex,toIndex]
 * first value of array is index from select,
 * second value is index to select
 */
export const getSelectingIndexes = (current, items, tabNext) => {
  const index = items.findIndex((item) => item.dataset.tool === current);
  if (tabNext) {
    if (current === null) {
      return [-1, 0];
    }
    if (index === items.length - 1) {
      return [index, 0];
    }
    return [index, index + 1];
  }
  if (current === null) {
    return [-1, items.length - 1];
  }

  if (index === 0) {
    return [0, items.length - 1];
  }
  return [index, index - 1];
};
