import { WarningContentType } from '@sb-ui/pages/User/LearnPage/BlockElement/types';
import { htmlToReact } from '@sb-ui/pages/User/LearnPage/utils';

import * as S from './Warning.styled';

const Warning = ({ content }) => {
  const { title, message } = content?.data;
  return (
    <S.Wrapper>
      <S.IconTitle>
        <S.Title>{htmlToReact(title)}</S.Title>
      </S.IconTitle>
      <S.Message>{htmlToReact(message)}</S.Message>
    </S.Wrapper>
  );
};

Warning.propTypes = {
  content: WarningContentType,
};

export default Warning;
