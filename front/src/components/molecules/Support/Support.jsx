import { Avatar } from 'antd';
import T from 'prop-types';
import { useEffect, useRef } from 'react';

import ava from '@sb-ui/resources/img/ava_tim.jpg';

import * as S from './Support.styled';

const Support = ({ open, setOpen }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen]);

  const handleSubscribe = (mail) => {
    // eslint-disable-next-line no-console
    console.log(mail);
  };

  return (
    <S.Main>
      <S.Modal open={open} ref={ref}>
        <S.ModalHeader>
          <S.ModalClose onClick={() => setOpen(false)} />
        </S.ModalHeader>
        <S.ModalBody>
          <S.ModalBodyTitle>Welcome to Studybites</S.ModalBodyTitle>
          <S.ModalBodyContent>
            <S.Info>
              <Avatar src={ava} />
              <S.Creator>
                <div>Tim</div>
                <S.CreatorText>Creator</S.CreatorText>
              </S.Creator>
            </S.Info>
            <S.Links>
              <div>
                <S.MailIcon />
                <a href="mailto:studybites@lambdabird.com">Email</a>
              </div>
              <div>
                <S.SendIcon />
                <a href="tg://user?tmaniac">Telegram</a>
              </div>
            </S.Links>
            <S.MessageBlock gridArea="c">
              <div>
                I would love to hear your feedback and experience using the app.
              </div>
              <S.MessageLink
                href="https://calendly.com/tim-reznich/tim-sb-interview"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call.
              </S.MessageLink>
            </S.MessageBlock>
            <S.MessageBlock gridArea="d">
              <div>You’re viewing an early version, so there will be bugs.</div>
              <S.MessageLink href="mailto:studybites@lambdabird.com?subject=Bug%20Report&body=Issue%20description%3A%0A%0A%0ASteps%20to%20reproduce%20the%20issue%3A%0A1.%0A2.%0A%0A%0AWhat's%20the%20expected%20result%3F%0A%0A%0AWhat's%20the%20actual%20result%3F%0A%0A%0AAdditional%20details%20%2F%20screenshot">
                Report a bug.
              </S.MessageLink>
            </S.MessageBlock>
            <S.MessageBlock gridArea="e">
              <div>
                Subscribe to get an early access to full-featured version
              </div>
              <S.EmailField placeholder="your@mail.com" />
            </S.MessageBlock>
            <S.SubscribeButton onClick={handleSubscribe}>
              Subscribe
            </S.SubscribeButton>
          </S.ModalBodyContent>
        </S.ModalBody>
      </S.Modal>
      <S.Button onClick={() => setOpen((prev) => !prev)}>
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
