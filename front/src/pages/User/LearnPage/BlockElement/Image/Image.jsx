import { Col, Row, Tooltip } from 'antd';

import { htmlToReact } from '@sb-ui/pages/User/LearnPage/utils';

import { BlockIdType, ImageContentType } from '../types';

import * as S from './Image.styled';

const Image = ({ content, blockId }) => {
  const { caption, location } = content?.data || {};
  return (
    <Row key={blockId}>
      <Tooltip placement="bottom" title={caption ? htmlToReact(caption) : ''}>
        <Col span={24}>
          <S.Image src={location} alt={caption} />
        </Col>
      </Tooltip>
    </Row>
  );
};

Image.propTypes = {
  blockId: BlockIdType,
  content: ImageContentType,
};

export default Image;
