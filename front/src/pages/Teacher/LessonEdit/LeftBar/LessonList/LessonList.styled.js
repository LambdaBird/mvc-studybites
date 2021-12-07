import { Badge as BadgeAntd, Popover as PopoverAntd, Typography } from 'antd';
import styled, { createGlobalStyle, css } from 'styled-components';
import { MoreOutlined } from '@ant-design/icons';

import LessonButton from '@sb-ui/components/atoms/Button';
import { HEADER_HEIGHT } from '@sb-ui/components/molecules/Header/Header.styled';
import variables from '@sb-ui/theme/variables';
import { Statuses } from '@sb-ui/utils/constants';

const { Text: TextAntd } = Typography;

const PopoverClassName = 'lesson-list-popover';

export const PopoverStyles = createGlobalStyle`
  .${PopoverClassName}  .ant-popover-inner-content{
    padding: 0.5rem 0.25rem;
  }
`;

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
    visibility: visible;
  }
`;

const CloseStyle = css`
  background-color: ${variables['gray-5']};
  border-radius: 0.25rem;
`;

const CloseSelectedStyle = css`
  display: block;
  ${CloseStyle};
`;

export const More = styled(MoreOutlined).attrs({
  className: 'close',
})`
  color: ${variables['secondary-text-color']};
  font-size: 1.3rem;

  @media (min-width: 768px) {
    visibility: hidden;
  }

  transform: rotateZ(90deg);
  ${(props) => props.selected && CloseSelectedStyle};
  &:hover {
    ${CloseStyle};
  }
`;

export const Popover = styled(PopoverAntd).attrs({
  trigger: 'focus',
  placement: 'rightTop',
  overlayClassName: PopoverClassName,
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
}))`
  display: flex;
`;

export const Text = styled(TextAntd).attrs({
  ellipsis: {
    tooltip: true,
  },
})`
  width: 90%;
  color: ${variables['neutral-8']};
  overflow-x: hidden;
`;

export const ButtonsWrapper = styled.div`
  color: ${variables['secondary-text-color']};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Button = styled(LessonButton)`
  width: 100%;
  justify-content: flex-start;
`;

export const ButtonText = styled.span`
  padding-left: 0.5rem;
`;
