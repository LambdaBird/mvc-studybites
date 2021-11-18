import { useTranslation } from 'react-i18next';

import { TagInput } from '@sb-ui/utils/editorjs/bricks-plugin/BricksComponent/TagInput';
import { Words } from '@sb-ui/utils/editorjs/bricks-plugin/BricksComponent/Words';

import BaseHeader from '../../PluginBase/BaseHeader';

import { ToolType } from './types';
import { useBricks } from './useBricks';
import * as S from './BricksComponent.styled';

const Bricks = ({ tool }) => {
  const { t } = useTranslation('editorjs');
  const { block } = tool || {};
  const {
    words,
    additionalWords,
    handleRemoveAdditionalWord,
    handleRemoveWord,
    handleAddNewAdditionalWord,
    handleAddNewWord,
    handleQuestionInput,
    handleQuestionKeyDown,
    questionInputRef,
    wordInputRef,
    additionalInputRef,
  } = useBricks(tool);

  return (
    <>
      <BaseHeader toolName={block?.name} />
      <S.Wrapper>
        <S.Input
          onKeyDown={handleQuestionKeyDown}
          onInput={handleQuestionInput}
          ref={questionInputRef}
          placeholder={t('tools.bricks.question')}
        />
        <TagInput
          moveBackInput={questionInputRef}
          inputRef={wordInputRef}
          addNewWord={handleAddNewWord}
          placeholder={t('tools.bricks.answer')}
        />
        <Words
          words={words}
          removeWord={handleRemoveWord}
          empty={t('tools.bricks.empty_words')}
        />
        <TagInput
          moveBackInput={wordInputRef}
          inputRef={additionalInputRef}
          addNewWord={handleAddNewAdditionalWord}
          placeholder={t('tools.bricks.additional')}
        />
        <Words
          words={additionalWords}
          removeWord={handleRemoveAdditionalWord}
          empty={t('tools.bricks.empty_additional')}
        />
      </S.Wrapper>
    </>
  );
};

Bricks.propTypes = {
  tool: ToolType,
};

export default Bricks;
