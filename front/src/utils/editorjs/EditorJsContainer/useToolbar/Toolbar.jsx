import T from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import {
  getBaseBlocks,
  getInteractiveBlocks,
} from '@sb-ui/pages/Teacher/LessonEdit/utils';
import * as S from '@sb-ui/utils/editorjs/EditorJsContainer/EditorJsContainer.styled';
import { getTranslationKey } from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbox/toolboxItemsHelpers';

import { Block } from './Block';
import { useSearch } from './useSearch';

const baseBlocks = getBaseBlocks(() => {});
const interactiveBlocks = getInteractiveBlocks(() => {});

const filterBlocks = ({ block, value, t }) => {
  const blockKey = getTranslationKey(block);
  const name = t(`tools.${blockKey}.title`);
  return name.toLowerCase().includes(value.toLowerCase());
};

const Toolbar = ({ isOpen, handlePlusClick, handleInsertBlockClick }) => {
  const { t } = useTranslation('editorjs');
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const handleInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus({ preventScroll: true });
    } else {
      setValue('');
    }
  }, [isOpen]);

  const filteredBaseBlocks = useMemo(
    () =>
      Object.keys(baseBlocks).filter((block) =>
        filterBlocks({ block, value, t }),
      ),
    [t, value],
  );

  const filteredInteractiveBlocks = useMemo(
    () =>
      Object.keys(interactiveBlocks).filter((block) =>
        filterBlocks({ block, value, t }),
      ),
    [t, value],
  );

  const { handleKeyDown } = useSearch({
    baseBlocks: filteredBaseBlocks,
    interactiveBlocks: filteredInteractiveBlocks,
    inputRef,
    isOpen,
    value,
    handleInsertBlockClick,
  });

  return (
    <S.Wrapper>
      <S.PlusToolbar active={isOpen} onClick={handlePlusClick}>
        <PlusOutlined />
      </S.PlusToolbar>
      {isOpen && (
        <S.ToolbarWrapper>
          <S.SearchInput
            ref={inputRef}
            onInput={handleInput}
            onKeyDown={(e) => handleKeyDown(e)}
            onBlur={() => {
              inputRef.current?.focus({ preventScroll: true });
            }}
            placeholder={t('tools.search_placeholder')}
          />
          <S.BlocksTitle>Basic blocks</S.BlocksTitle>
          <S.Blocks>
            {filteredBaseBlocks.map((block) => (
              <Block
                key={block}
                onClick={() => handleInsertBlockClick(block)}
                block={block}
                blocks={baseBlocks}
              />
            ))}
          </S.Blocks>
          <S.InteractiveBlocksTitle>
            Interactive blocks
          </S.InteractiveBlocksTitle>
          <S.Blocks>
            {filteredInteractiveBlocks.map((block) => (
              <Block
                key={block}
                onClick={() => handleInsertBlockClick(block)}
                block={block}
                blocks={interactiveBlocks}
              />
            ))}
          </S.Blocks>
        </S.ToolbarWrapper>
      )}
    </S.Wrapper>
  );
};

Toolbar.propTypes = {
  isOpen: T.bool,
  handlePlusClick: T.func,
  handleInsertBlockClick: T.func,
};

export default Toolbar;
