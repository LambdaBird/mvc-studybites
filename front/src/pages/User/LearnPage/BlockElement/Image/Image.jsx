import { Col, Row, Typography } from 'antd';

import { htmlToReact } from '@sb-ui/pages/User/LearnPage/utils';

import { BlockIdType, ImageContentType } from '../types';

import * as S from './Image.styled';

const { Text } = Typography;

const Image = ({ content, blockId }) => {
  const { caption, location } = content?.data || {};
  return (
    <Row key={blockId}>
      <Col span={24}>
        <S.Image src={location} alt={caption} />
      </Col>
      {caption && (
        <S.Caption>
          <Text>{htmlToReact(caption)}</Text>
        </S.Caption>
      )}
    </Row>
  );
};

Image.propTypes = {
  blockId: BlockIdType,
  content: ImageContentType,
};

export default Image;
