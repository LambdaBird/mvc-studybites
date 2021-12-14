import { DatePicker } from 'antd';
import styled from 'styled-components';

import { HEADER_HEIGHT } from '@sb-ui/components/molecules/Header/Header.styled';
import variables from '@sb-ui/theme/variables';

import { RIGHT_BAR_WIDTH } from '../../constants';

const { RangePicker: RangePickerAntd } = DatePicker;

export const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  height: 100vh;
  width: ${RIGHT_BAR_WIDTH}px;
  border-left: 1px solid ${variables['gray-4']};
  transition: all 0.3s ease 0.1s;
  transform: translate3d(${(props) => (props.opened ? '0' : '100%')}, 0, 0);
  padding-top: ${HEADER_HEIGHT}px;

  @media (max-width: 767px) {
    background-color: white;
    width: 100vw;
  }
`;

export const Title = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${variables['gray-4']};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${variables['secondary-text-color']};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
  height: calc(100% - 2 * ${HEADER_HEIGHT}px);
  overflow-y: auto;
`;

export const RangePicker = styled(RangePickerAntd).attrs({
  format: 'YYYY/MM/DD',
  allowEmpty: [true, true],
})`
  margin-top: 1rem;
`;

export const FunnelTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 12px;
  line-height: 20px;
`;

export const FunnelTitleHeader = styled.span`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 0.5rem;
  color: black;
`;

export const FunnelContainerWrapper = styled.div``;

export const NoStudents = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
