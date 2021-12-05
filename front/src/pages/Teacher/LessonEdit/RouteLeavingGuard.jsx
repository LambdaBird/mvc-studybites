import { Modal } from 'antd';
import T from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Prompt, useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const RouteLeavingGuard = ({ when, shouldBlockNavigation, setAllowed }) => {
  const { t } = useTranslation('teacher');
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleBlockedNavigation = (nextLocation) => {
    if (nextLocation?.state?.force) {
      return true;
    }
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      setModalVisible(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };
  const handleConfirmNavigationClick = useCallback(() => {
    setModalVisible(false);
    setConfirmedNavigation(true);
    setAllowed(true);
  }, [setAllowed]);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      history.push(lastLocation.pathname);
      setConfirmedNavigation(false);
    }
  }, [confirmedNavigation, lastLocation, history]);

  useEffect(() => {
    if (modalVisible) {
      Modal.confirm({
        title: t('lesson_edit.unsaved_modal.title'),
        icon: <ExclamationCircleOutlined />,
        content: t('lesson_edit.unsaved_modal.content'),
        okText: t('lesson_edit.unsaved_modal.ok_text'),
        cancelText: t('lesson_edit.unsaved_modal.cancel_text'),
        onCancel: closeModal,
        onOk: handleConfirmNavigationClick,
      });
    }
  }, [handleConfirmNavigationClick, modalVisible, t]);
  return <Prompt when={when} message={handleBlockedNavigation} />;
};

RouteLeavingGuard.propTypes = {
  when: T.bool,
  shouldBlockNavigation: T.func,
  setAllowed: T.func,
};
export default RouteLeavingGuard;
