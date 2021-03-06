import HtmlToReact from 'html-to-react';

const HtmlToReactParser = HtmlToReact.Parser;
const htmlToReactParser = new HtmlToReactParser();

export const htmlToReact = (html) => htmlToReactParser.parse(html);

export const START_TYPE = 'start';
export const NEXT_TYPE = 'next';
export const FINISH_TYPE = 'finish';
export const RESPONSE_TYPE = 'response';

export const interactiveEnter = (event, element, next) => {
  if (
    event.key === 'Enter' &&
    ((next && !event.shiftKey) || (!next && event.shiftKey))
  ) {
    event.preventDefault();
    element?.focus?.();
  }
};
