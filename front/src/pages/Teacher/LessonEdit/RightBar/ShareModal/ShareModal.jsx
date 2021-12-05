import { Switch } from 'antd';
import T from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import { queryClient } from '@sb-ui/query';
import { GlobalOutlined } from '@sb-ui/resources/icons';
import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { postShareLesson } from '@sb-ui/utils/api/v1/teacher';
import { HOST, Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import { TEACHER_LESSON_BASE_KEY } from '@sb-ui/utils/queries';

import * as S from './ShareModal.styled';

const ShareModal = ({ publicId, opened, setOpened }) => {
  const { id: lessonId } = useParams();
  const { t } = useTranslation('teacher');
  const inputLinkRef = useRef(null);
  const [isShareAnyone, setIsShareAnyone] = useState(!!publicId);

  const handleOverlayClick = useCallback(() => {
    setOpened(false);
  }, [setOpened]);

  const { mutate: shareLesson } = useMutation(postShareLesson, {
    onSuccess: () => {
      LessonsStorage.setLesson({
        id: lessonId,
        status: isShareAnyone ? Statuses.PUBLIC : Statuses.DRAFT,
      });
      queryClient.invalidateQueries(TEACHER_LESSON_BASE_KEY);
    },
  });

  const handleSwitchChange = (isEnabled) => {
    setIsShareAnyone(isEnabled);
    if (isEnabled) {
      amplitudeLogEvent(AMPLITUDE_EVENTS.SHARE_TO_WEB);
    }
    shareLesson({
      id: lessonId,
      status: isEnabled ? Statuses.PUBLIC : Statuses.DRAFT,
    });
  };

  const fullLink = useMemo(
    () => (publicId ? `${HOST}/learn/${publicId}` : ''),
    [publicId],
  );

  const handleCopyClick = useCallback(() => {
    inputLinkRef.current.focus();
    inputLinkRef.current.select();

    document.execCommand('copy');
  }, []);

  useEffect(() => {
    setIsShareAnyone(!!publicId);
  }, [lessonId, publicId]);

  useEffect(() => {
    if (publicId) {
      setIsShareAnyone(true);
    }
  }, [publicId]);

  return (
    <>
      {opened && <S.Overlay onClick={handleOverlayClick} />}
      <S.Wrapper showShareAnyone={isShareAnyone} opened={opened}>
        <S.ShareWrapper>
          <S.ShareLeft>
            <GlobalOutlined
              style={{
                fontSize: '24px',
              }}
            />
            <S.ShareText>
              <S.ShareTitle>{t('right_bar.share_modal.title')}</S.ShareTitle>
              <S.ShareDescription>
                {t('right_bar.share_modal.description')}
              </S.ShareDescription>
            </S.ShareText>
          </S.ShareLeft>
          <Switch checked={isShareAnyone} onChange={handleSwitchChange} />
        </S.ShareWrapper>

        <S.InputWrapper showShareAnyone={isShareAnyone}>
          <S.Input
            onDoubleClick={handleCopyClick}
            ref={inputLinkRef}
            value={fullLink}
            placeholder={t('right_bar.share_modal.link_placeholder')}
          />
          <S.InputAddon onClick={handleCopyClick}>
            {t('right_bar.share_modal.copy_button')}
          </S.InputAddon>
        </S.InputWrapper>
      </S.Wrapper>
    </>
  );
};

ShareModal.propTypes = {
  publicId: T.oneOfType([T.string, T.bool]),
  opened: T.bool,
  setOpened: T.func,
};

export default ShareModal;
