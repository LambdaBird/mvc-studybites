import T from 'prop-types';
import { useTranslation } from 'react-i18next';

import { htmlToReact } from '@sb-ui/pages/User/LearnPage/utils';

import { getTranslationKey } from '../useToolbox/toolboxItemsHelpers';

import * as S from '../EditorJsContainer.styled';

export const Block = ({ onClick, blocks, block }) => {
  const { t } = useTranslation('editorjs');
  const blockKey = getTranslationKey(block);
  return (
    <S.BlockWrapper onClick={onClick}>
      <S.BlockImage>
        {htmlToReact(blocks[block]?.class?.toolbox?.icon)}
      </S.BlockImage>
      <S.DataWrapper>
        <S.Name>{t(`tools.${blockKey}.title`)}</S.Name>
        <S.Description>{t(`tools.${blockKey}.description`)}</S.Description>
      </S.DataWrapper>
    </S.BlockWrapper>
  );
};

Block.propTypes = {
  onClick: T.func,
  blocks: T.shape({}),
  block: T.string,
};
