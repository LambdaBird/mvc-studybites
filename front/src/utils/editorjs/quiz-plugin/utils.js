/**
 * Helper for making Elements with attributes
 *
 * @param  {string} tagName           - new Element tag name
 * @param  {Array|string} classNames  - list or name of CSS classname(s)
 * @param  {object} attributes        - any attributes
 * @returns {Element}
 */
export function make(tagName, classNames = null, attributes = {}) {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (classNames) {
    el.classList.add(classNames);
  }

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const attrName in attributes) {
    el[attrName] = attributes[attrName];
  }

  return el;
}

/**
 * Moves caret to the end of contentEditable element
 *
 * @param {Element} element - contentEditable element
 * @param {boolean} toStart - pass true to move caret to start. Otherwise will it be moved to the end
 * @param {number} offset - range start offset.
 *                          If element is Text, offset is a chars count.
 *                          If element is an Element, offset is a childNode index
 *                          {@see https://developer.mozilla.org/en-US/docs/Web/API/Range/setStart}
 *
 * @returns {void}
 */
export function moveCaret(element, toStart = false, offset = undefined) {
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(element);

  if (offset !== undefined) {
    range.setStart(element, offset);
    range.setEnd(element, offset);
  }

  range.collapse(toStart);

  selection.removeAllRanges();
  selection.addRange(range);
}
