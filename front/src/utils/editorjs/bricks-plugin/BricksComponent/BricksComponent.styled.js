import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.div.attrs({
  className: 'cdx-input',
  contentEditable: true,
})`
  margin-bottom: 1rem;
`;

export const RealInput = styled.input.attrs({
  className: 'cdx-input',
})``;

export const TagWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const WordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const EnterButton = styled.div`
  box-sizing: content-box;
  border: 1px solid rgba(201, 201, 204, 0.48);
  cursor: pointer;
  background-color: #fafafa;
  border-left: none;
  padding: 10px;
  height: 22px;
  width: 22px;
`;

export const Word = styled.div`
  user-select: none;
  box-sizing: border-box;
  margin: 0 8px 8px 0;
  color: #000000d9;
  font-variant: tabular-nums;
  display: inline-block;
  height: auto;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s;
`;

export const WordDelete = styled.span`
  cursor: pointer;
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  margin-left: 4px;
  vertical-align: 0.125em;
`;

export const NoWord = styled.span`
  height: 30px;
`;
