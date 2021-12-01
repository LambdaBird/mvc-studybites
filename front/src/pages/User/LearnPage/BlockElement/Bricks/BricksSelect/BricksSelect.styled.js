import styled from 'styled-components';

import variables from '@sb-ui/theme/variables';

// px sizes
export const HEIGHT_GAP = 8;
export const HEIGHT_WORD = 22;
export const BORDER = 1;
export const HEIGHT_GAP_SELECTED = 24;

export const LineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 2rem 0;
`;

export const Line = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  height: 2rem;
  border-bottom: 1px solid ${variables['lesson-block-bricks-word-underline']};
  z-index: 1;
`;

export const FirstLine = styled(Line)`
  z-index: 2;
`;

export const WordsWrapperSelected = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const WordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Word = styled.div`
  display: inline-block;
  margin-bottom: ${HEIGHT_GAP}px;
  margin-right: 0.5rem;
  border-radius: 2px;
  border: ${BORDER}px solid ${variables['border-color-base']};
  background-color: ${(props) =>
    props.selected
      ? variables['lesson-block-bricks-word-background']
      : variables['background-color-light']};
  padding: 0 1rem;
  color: ${(props) =>
    props.selected
      ? variables['lesson-block-bricks-word-background']
      : 'inherit'};
  cursor: ${(props) => (props.selected ? 'default' : 'pointer')};
  user-select: none;
`;

export const SelectedWord = styled(Word)`
  margin-right: 0.5rem;
  margin-bottom: ${HEIGHT_GAP_SELECTED}px;
`;

export const WordDisabled = styled(SelectedWord)`
  cursor: default;
`;
