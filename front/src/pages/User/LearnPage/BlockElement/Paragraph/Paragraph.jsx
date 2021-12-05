import { htmlToReact } from '@sb-ui/pages/User/LearnPage/utils';

import { ParagraphContentType } from '../types';

const Paragraph = ({ content }) => {
  const htmlInput = content?.data?.text;

  const handleParagraphClick = (event) => {
    const { target } = event;
    if (target.nodeName === 'A') {
      event.preventDefault();
      window.open(target.href, '_blank');
    }
  };

  return (
    <p aria-hidden onClick={handleParagraphClick}>
      {htmlToReact(htmlInput)}
    </p>
  );
};

Paragraph.propTypes = {
  content: ParagraphContentType,
};

export default Paragraph;
