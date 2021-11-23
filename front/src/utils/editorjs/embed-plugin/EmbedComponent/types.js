import T from 'prop-types';

export const ToolType = T.shape({
  api: T.shape({
    i18n: T.shape({
      t: T.func,
    }),
  }),
  block: T.shape({
    name: T.string,
  }),
  data: T.shape({
    requireAttachment: T.bool,
    questionInput: T.element,
  }),
  requireAttachment: T.bool,
  questionInput: T.element,
  readOnly: T.bool,
});
