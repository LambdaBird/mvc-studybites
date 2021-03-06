import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import { htmlToReact } from '@sb-ui/pages/User/LearnPage/utils';

import { getNextInputByIndex } from './getNextInputByIndex';
import * as S from './GapsInput.styled';

const GapsInput = ({
  lastInputRef,
  sendButtonRef,
  gaps,
  setGaps,
  disabled,
  result,
}) => {
  const inputsRef = useRef(new Array(gaps.length).fill(null));

  const handleInputChange = (id, value) => {
    setGaps((prev) => {
      const newGaps = [...prev];
      newGaps.find((gap) => gap.id === id).value = value;
      return newGaps;
    });
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter') {
      const inputIndex = gaps.findIndex((input) => input.id === id);
      const input = getNextInputByIndex(
        inputsRef.current,
        inputIndex,
        event.shiftKey,
      );
      if (!event.shiftKey && !input) {
        sendButtonRef.current?.focus?.();
        event.preventDefault();
      }
      input?.focus?.();
    }
  };

  useEffect(() => {
    if (lastInputRef) {
      const inputElement = inputsRef.current.filter(Boolean).slice(-1)?.[0];
      // eslint-disable-next-line no-param-reassign
      lastInputRef.current = inputElement?.input;
    }
  }, [lastInputRef]);

  return (
    <S.Wrapper>
      {gaps?.map(({ value, id, type }, index) => {
        if (type === 'text') {
          return <span key={id}>{htmlToReact(value)}</span>;
        }
        if (result) {
          const { value: resultValue, correct: correctValue } =
            result.find((x) => x.id === id) || {};

          return (
            <React.Fragment key={id}>
              {correctValue ? (
                <S.CorrectSpan>{resultValue}</S.CorrectSpan>
              ) : (
                <S.WrongSpan>{resultValue?.[0]}</S.WrongSpan>
              )}
            </React.Fragment>
          );
        }

        return (
          <S.Input
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            key={id}
            value={value}
            onKeyDown={disabled ? null : (e) => handleKeyDown(e, id)}
            onChange={(e) => handleInputChange(id, e.target.value)}
            disabled={disabled}
          />
        );
      })}
    </S.Wrapper>
  );
};

GapsInput.propTypes = {
  lastInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  sendButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  gaps: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.number,
      type: PropTypes.oneOf(['text', 'input']),
    }),
  ),
  setGaps: PropTypes.func,
  disabled: PropTypes.bool,
  result: PropTypes.arrayOf(
    PropTypes.shape({
      correct: PropTypes.bool,
      value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      id: PropTypes.number,
      type: PropTypes.oneOf(['text', 'input']),
    }),
  ),
};

export default GapsInput;
