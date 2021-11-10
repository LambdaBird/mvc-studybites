import { Switch } from 'antd';
import T from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { GlobalOutlined } from '@ant-design/icons';

import { Statuses } from '@sb-ui/pages/Teacher/Home/Dashboard/constants';
import { queryClient } from '@sb-ui/query';
import { postShareLesson } from '@sb-ui/utils/api/v1/teacher';
import { setStorageLesson } from '@sb-ui/utils/lessonsStorage';
import { TEACHER_LESSON_BASE_KEY } from '@sb-ui/utils/queries';

import * as S from './ShareModal.styled';

const HOST = process.env.REACT_APP_SELF_HOST;

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
      setStorageLesson({
        status: Statuses.PUBLIC,
        id: lessonId,
      });
      queryClient.invalidateQueries(TEACHER_LESSON_BASE_KEY);
    },
  });

  const handleSwitchChange = (value) => {
    if (value) {
      setIsShareAnyone(value);
      shareLesson({ id: lessonId });
    }
  };

  const fullLink = useMemo(
    () => publicId && `${HOST}/learn/${publicId}`,
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
          <Switch
            disabled={isShareAnyone}
            checked={isShareAnyone}
            onChange={handleSwitchChange}
          />
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
  publicId: T.string,
  opened: T.bool,
  setOpened: T.func,
};

export default ShareModal;
