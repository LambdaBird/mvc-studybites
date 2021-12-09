import { Input, Typography } from 'antd';
import T from 'prop-types';
import { useState } from 'react';

import * as S from './ActionBlock.styled';

const { Link } = Typography;

const ACTION_BLOCK_EMAIL_TYPE = 'email';

const ActionBlock = ({ text, action, actionText, gridArea, type }) => {
  const [emailInput, setEmailInput] = useState('');
  const handleLinkClick = () => {
    action();
  };

  const handleSubscribe = () => {
    action(emailInput);
  };

  return (
    <S.Main gridArea={gridArea}>
      <S.Text>{text}</S.Text>
      {type === ACTION_BLOCK_EMAIL_TYPE ? (
        <S.Submit>
          <Input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="your@mail.com"
          />
          <S.Button onClick={handleSubscribe}>Subscribe</S.Button>
        </S.Submit>
      ) : (
        <Link onClick={handleLinkClick}>{actionText}</Link>
      )}
    </S.Main>
  );
};

ActionBlock.propTypes = {
  text: T.string,
  action: T.func,
  actionText: T.string,
  gridArea: T.string,
  type: T.oneOf([ACTION_BLOCK_EMAIL_TYPE]),
};

export default ActionBlock;
