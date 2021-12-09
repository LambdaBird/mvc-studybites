import { useTranslation } from 'react-i18next';

import { getTranslationKey } from '@sb-ui/utils/editorjs/EditorJsContainer/useToolbox/toolboxItemsHelpers';

import { BlockType } from '../types';

import { SadFace } from './SadFace';
import * as S from './Error.styled';

const Error = ({ blockType }) => {
  const { t } = useTranslation('editorjs');
  const blockKey = getTranslationKey(blockType);
  return (
    <S.Main className="ce-block__content">
      <SadFace />
      <S.Message>
        <S.Title>{t(`tools.${blockKey}.title`)}</S.Title>
        <div> {t('common:errors.parse_block')}</div>
      </S.Message>
    </S.Main>
  );
};

Error.propTypes = {
  blockType: BlockType,
};

export default Error;
