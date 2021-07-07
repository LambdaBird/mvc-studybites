import { useMemo } from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import ColumnDisabledCheckbox from '@sb-ui/components/atoms/ColumnDisabledCheckbox';
import * as S from './AnswerResult.styled';

const { Text } = Typography;

const AnswerResult = ({ difference, options, correct }) => {
  const defaultValueCorrect = useMemo(
    () =>
      difference
        ?.map((x, i) => (x === true && !options[i].correct ? i : null))
        ?.filter((x) => x !== null),
    [difference, options],
  );

  const optionsDifference = useMemo(
    () =>
      difference
        ?.map((x, i) =>
          x === true
            ? {
                label: options[i].label,
                value: i,
              }
            : null,
        )
        ?.filter((x) => x !== null),
    [difference, options],
  );
  return (
    <>
      {correct ? (
        <S.AnswerWrapper>
          <Text>You`r right !</Text>
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        </S.AnswerWrapper>
      ) : (
        <>
          <S.AnswerWrapper>
            <Text>You’re wrong. Correct answer:</Text>
            <CloseCircleTwoTone twoToneColor="#F5222D" />
          </S.AnswerWrapper>

          <ColumnDisabledCheckbox
            value={defaultValueCorrect}
            options={optionsDifference}
          />
        </>
      )}
    </>
  );
};

AnswerResult.propTypes = {
  difference: PropTypes.arrayOf(PropTypes.bool).isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  correct: PropTypes.bool.isRequired,
};

export default AnswerResult;