import { Avatar } from 'antd';
import T from 'prop-types';

import ActionBlock from './ActionBlock';
import * as S from './Support.styled';

const Support = ({ open, setOpen }) => {
  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  const handleBookCall = () => {
    console.log('book call');
  };

  const handleReport = () => {
    console.log('report');
  };

  const handleSubscribe = (mail) => {
    console.log(mail);
  };

  return (
    <S.Main>
      <S.Modal open={open}>
        <S.ModalHeader>
          <S.ModalClose />
        </S.ModalHeader>
        <S.ModalBody>
          <S.ModalBodyTitle>Welcome to studybites</S.ModalBodyTitle>
          <S.ModalBodyContent>
            <S.Info>
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <S.Creator>
                <div>Tim</div>
                <S.CreatorText>Creator</S.CreatorText>
              </S.Creator>
            </S.Info>
            <S.Links>
              <div>
                <a href="mailto:mail@.com">Email</a>
              </div>
              <div>
                <a href="tg://user?tmaniac">Telegram</a>
              </div>
            </S.Links>
            <ActionBlock
              gridArea="c"
              text="I would love to hear your feedback and experience using the app."
              action={handleBookCall}
              actionText="Book a call."
            />
            <ActionBlock
              gridArea="d"
              text="You’re viewing an early version, so there will be bugs."
              action={handleReport}
              actionText="Report a bug"
            />
            <ActionBlock
              gridArea="e"
              text="Subscribe to get an early access to full-featured version"
              action={handleSubscribe}
              type="email"
            />
          </S.ModalBodyContent>
        </S.ModalBody>
      </S.Modal>
      <S.Button onClick={handleButtonClick}>
        {open ? <S.CloseIcon /> : <S.QuestionIcon />}
      </S.Button>
    </S.Main>
  );
};

Support.propTypes = {
  open: T.bool,
  setOpen: T.func,
};

export default Support;
