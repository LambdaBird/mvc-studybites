import {
  Badge as BadgeAntd,
  Popconfirm as PopConfirmAntd,
  Typography,
} from 'antd';
import styled, { css } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

import { HEADER_HEIGHT } from '@sb-ui/components/molecules/Header/Header.styled';
import variables from '@sb-ui/theme/variables';
import { Statuses } from '@sb-ui/utils/constants';

const { Text: TextAntd } = Typography;

export const Lessons = styled.div`
  height: calc(100%);
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const LessonsTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;
`;

export const LessonsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 2 * ${HEADER_HEIGHT}px);
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const Lesson = styled.div`
  cursor: pointer;
  user-select: none;
  padding: 0.25rem 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  ${(props) =>
    props.selected
      ? `
      background-color: ${variables['gray-4']};
      `
      : ''}

  &:hover {
    background-color: ${variables['gray-4']};
  }

  &:hover .close {
    display: block;
  }
`;

const CloseStyle = css`
  background-color: ${variables['gray-5']};
  border-radius: 1rem;
`;

const CloseSelectedStyle = css`
  display: block;
  ${CloseStyle};
`;

export const Close = styled(CloseOutlined).attrs({
  className: 'close',
})`
  color: ${variables['secondary-text-color']};
  font-size: 1rem;
  display: none;
  padding: 0.1rem;
  ${(props) => props.selected && CloseSelectedStyle};
  &:hover {
    ${CloseStyle};
  }
`;

export const PopConfirm = styled(PopConfirmAntd).attrs({
  placement: 'bottom',
})``;

const getStatus = (status) => {
  switch (status) {
    case Statuses.PUBLIC:
      return 'success';
    case Statuses.DRAFT:
      return 'warning';
    case Statuses.UNSAVED:
    default:
      return 'default';
  }
};

export const Badge = styled(BadgeAntd).attrs(({ status }) => ({
  status: getStatus(status),
}))``;

export const Text = styled(TextAntd).attrs({
  ellipsis: {
    tooltip: true,
  },
})`
  width: 90%;
  color: ${variables['neutral-8']};
  overflow-x: hidden;
`;
