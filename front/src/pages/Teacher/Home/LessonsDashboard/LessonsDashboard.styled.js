import styled from 'styled-components';
import { Row, Col, Pagination, Typography, Select } from 'antd';

const { Title } = Typography;

export const Wrapper = styled(Row)`
  margin-top: 3rem;
`;

export const CardCol = styled(Col)`
  height: 8rem;
  width: 100%;
`;

export const DashboardControls = styled(Row)`
  width: 100%;
  padding: 0 1rem;
`;

export const DashboardPagination = styled(Pagination)`
  align-self: flex-end;
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
`;

export const DashboardTitle = styled(Title)`
  padding-top: 0.5rem;
  font-weight: 400 !important;
  font-size: 1.25rem !important;
`;

export const StyledSelect = styled(Select)`
  min-width: 8rem;
`;