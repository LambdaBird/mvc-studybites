import PropTypes from 'prop-types';
import { Col } from 'antd';
import * as S from './Block.styled';

const Block = ({ top, children, isQuiz, padding }) => {
  if (children?.length === 0 || !children) {
    return null;
  }

  if (children?.[0]?.props?.isResult) {
    return children;
  }

  return (
    <S.PageRow justify="center" align="top">
      <S.BlockCol
        top={top}
        xs={{ span: isQuiz ? 24 : 20 }}
        sm={{ span: isQuiz ? 24 : 18 }}
        md={{ span: isQuiz ? 24 : 16 }}
        lg={{ span: isQuiz ? 24 : 14 }}
      >
        <S.BlockWrapper padding={padding} justify="start" align="top">
          <S.StyledRow justify="space-between">
            {Array.isArray(children) ? (
              children?.map((elem) => (
                <Col key={elem.blockId} span={24}>
                  {elem}
                </Col>
              ))
            ) : (
              <Col span={24}>{children}</Col>
            )}
          </S.StyledRow>
        </S.BlockWrapper>
      </S.BlockCol>
    </S.PageRow>
  );
};

Block.propTypes = {
  top: PropTypes.string,
  padding: PropTypes.string,
  isQuiz: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Block;
