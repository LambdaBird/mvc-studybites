import { htmlToReact } from '@sb-ui/pages/User/LearnPage/utils';

import { HeaderContentType } from '../types';

const Header = ({ content }) => {
  const { text, level } = content.data;
  const HeaderTag = `h${level}`;
  return <HeaderTag>{htmlToReact(text)}</HeaderTag>;
};

Header.propTypes = {
  content: HeaderContentType,
};

export default Header;
