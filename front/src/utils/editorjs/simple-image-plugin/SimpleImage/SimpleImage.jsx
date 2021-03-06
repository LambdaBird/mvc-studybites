import { useTranslation } from 'react-i18next';

import BaseHeader from '../../PluginBase/BaseHeader';

import { ToolType } from './types';
import { useImage } from './useImage';
import { useSimpleImage } from './useSimpleImage';
import * as S from './SimpleImage.styled';

const SimpleImage = ({ tool }) => {
  const { t } = useTranslation('editorjs');

  const { data, block } = tool;
  const { handleError, handleLoad, src, setSrc, loaded, error } = useImage();

  const {
    linkInputRef,
    captionInputRef,
    handleInputCaptionKeyDown,
    handleInputLinkKeyDown,
    handleLinkInput,
  } = useSimpleImage({ tool, data, loaded, src, setSrc, error });

  const isError = error && !loaded;
  return (
    <>
      <BaseHeader noHint toolName={block?.name} />
      <S.Bottom>
        <S.InputLink
          isShow
          isError={isError}
          onInput={handleLinkInput}
          onKeyDown={handleInputLinkKeyDown}
          ref={linkInputRef}
          placeholder={t('tools.image.input')}
        />
        <S.Image
          error={error}
          onError={handleError}
          onLoad={handleLoad}
          src={src}
        />
        <S.InputCaption
          onKeyDown={handleInputCaptionKeyDown}
          ref={captionInputRef}
          placeholder={t('tools.image.caption')}
        />
      </S.Bottom>
    </>
  );
};

SimpleImage.propTypes = {
  tool: ToolType,
};

export default SimpleImage;
