import styled from 'styled-components';
import { Avatar, Col, Progress, Row, Typography } from 'antd';
import variables from '@sb-ui/theme/variables';
import {
  DESCRIPTION_COLOR,
  VOLCANO_2,
  VOLCANO_6,
  WHITE_COLOR,
} from '@sb-ui/resources/styles/Global.styled';

const { Text } = Typography;

export const MainSpace = styled(Row)`
  background-color: ${WHITE_COLOR};
`;

export const LeftContent = styled(Col)`
  margin-right: 1.5rem;
  padding: 1rem;
  padding-bottom: 0;
`;

export const RightContent = styled(Col)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

export const LessonImg = styled.img`
  height: 100%;
  width: 200px;
`;

export const DescriptionText = styled(Text)`
  text-align: justify;
  color: ${DESCRIPTION_COLOR};
`;

export const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${WHITE_COLOR};

  position: absolute;
  left: 1.5rem;
  bottom: 2.75rem;
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
`;

export const AuthorAvatar = styled(Avatar)`
  color: ${VOLCANO_6};
  background-color: ${VOLCANO_2};
`;

export const AuthorName = styled(Typography.Link)`
  margin-left: 0.5rem;
  white-space: nowrap;
`;

export const EnrollRow = styled(Row)`
  margin-top: auto;
`;

export const ProgressBar = styled(Progress)`
  padding: 0.5rem 0;

  .ant-progress-bg {
    background-color: ${variables['primary-color']} !important;
  }

  .ant-progress-text {
    color: ${variables['secondary-text-color']} !important;
  }
`;