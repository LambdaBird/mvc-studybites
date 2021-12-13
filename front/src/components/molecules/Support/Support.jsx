import { Form, message } from 'antd';
import T from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import {
  emailRules,
  MAIL,
  MAIL_REPORT,
  TELEGRAM_USER,
} from '@sb-ui/components/molecules/Support/constants';
import ava from '@sb-ui/resources/img/ava_tim.jpg';
import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { postSubscribe } from '@sb-ui/utils/api/v1/user';

import * as S from './Support.styled';

const Support = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [form] = Form.useForm();
  const ref = useRef(null);
  const emailRef = useRef(null);
  const buttonRef = useRef(null);

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const { mutate: subscribe } = useMutation(postSubscribe, {
    onSuccess: (_, params) => {
      amplitudeLogEvent(AMPLITUDE_EVENTS.SUBSCRIBE, params);
      setSubscribed(true);
      message.success({
        content: t('support_modal.success_subscribe'),
        duration: 2,
      });
    },
    onError: () => {
      message.error({
        content: t('support_modal.fail_subscribe'),
        duration: 2,
      });
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !ref.current?.contains?.(event.target) &&
        !buttonRef.current?.contains?.(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen]);

  const handleSubscribe = async () => {
    try {
      await form.validateFields();
      subscribe({
        email,
        pathname: history.location.pathname,
      });
    } catch (errorInfo) {
      emailRef.current?.focus();
    }
  };

  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubscribe();
    }
  };

  return createPortal(
    <S.Main>
      <S.GlobalStyleOverflow isOpen={open} />
      <S.Modal open={open} ref={ref}>
        <S.ModalHeader>
          <S.ModalClose onClick={() => setOpen(false)} />
        </S.ModalHeader>
        <S.ModalBody>
          <S.ModalBodyTitle>{t('support_modal.header')}</S.ModalBodyTitle>
          <S.ModalBodyContent>
            <S.Info>
              <S.Avatar src={ava} />
              <S.Creator>
                <S.CreatorName>{t('support_modal.creator.name')}</S.CreatorName>
                <S.CreatorText>
                  {t('support_modal.creator.description')}
                </S.CreatorText>
              </S.Creator>
            </S.Info>
            <S.Links>
              <div>
                <S.MailIcon />
                <a href={`mailto:${MAIL}`}>{t('support_modal.links.email')}</a>
              </div>
              <div>
                <S.SendIcon />
                <a href={`tg://resolve?domain=${TELEGRAM_USER}`}>
                  {t('support_modal.links.telegram')}
                </a>
              </div>
            </S.Links>
            <S.MessageBlock gridArea="c">
              <div>{t('support_modal.actions_book.description')}</div>
              <S.MessageLink
                href="https://calendly.com/tim-reznich/tim-sb-interview"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('support_modal.actions_book.action')}
              </S.MessageLink>
            </S.MessageBlock>
            <S.MessageBlock gridArea="d">
              <div>{t('support_modal.actions_report.description')}</div>
              <S.MessageLink href={`mailto:${MAIL_REPORT}`}>
                {t('support_modal.actions_report.action')}
              </S.MessageLink>
            </S.MessageBlock>
            <S.MessageBlock gridArea="e">
              <div>{t('support_modal.actions_subscribe.description')}</div>
              <Form form={form}>
                <Form.Item name="email" rules={emailRules}>
                  <S.EmailField
                    ref={emailRef}
                    value={email}
                    disabled={subscribed}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleEmailKeyDown}
                    placeholder={t(
                      'support_modal.actions_subscribe.email_placeholder',
                    )}
                  />
                </Form.Item>
              </Form>
            </S.MessageBlock>
            {!subscribed && (
              <S.SubscribeButton onClick={handleSubscribe}>
                {t('support_modal.actions_subscribe.action')}
              </S.SubscribeButton>
            )}
          </S.ModalBodyContent>
        </S.ModalBody>
      </S.Modal>
      <S.Button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
        {open ? <S.CloseIcon /> : <S.QuestionIcon />}
      </S.Button>
    </S.Main>,
    document.body,
  );
};

Support.propTypes = {
  open: T.bool,
  setOpen: T.func,
};

export default Support;
