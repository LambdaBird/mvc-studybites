import { useTranslation } from 'react-i18next';

import { htmlToReact } from '@sb-ui/pages/User/LearnPage/utils';
import BaseHeader from '@sb-ui/utils/editorjs/PluginBase/BaseHeader';

import { ToolType } from './types';
import { useEmbed } from './useEmbed';
import * as S from './EmbedComponent.styled';

const EmbedComponent = ({ tool }) => {
  const { t } = useTranslation('editorjs');
  const { block } = tool;

  const {
    linkRef,
    contentRef,
    captionRef,
    embedHTML,
    contentHeight,
    link,
    isLoaded,
    handleLinkInput,
    handleCaptionDown,
    handleLinkKeyDown,
  } = useEmbed({ tool });

  return (
    <>
      <BaseHeader noHint toolName={block?.name} />
      <S.Bottom>
        <S.RealInput
          ref={linkRef}
          value={link}
          onChange={handleLinkInput}
          onKeyDown={handleLinkKeyDown}
          placeholder={t('tools.embed.input')}
        />
        <S.Content height={contentHeight} ref={contentRef}>
          {htmlToReact(embedHTML)}
        </S.Content>
        {isLoaded && (
          <S.Input
            onKeyDown={handleCaptionDown}
            ref={captionRef}
            placeholder={t('tools.embed.caption')}
          />
        )}
      </S.Bottom>
    </>
  );
};

EmbedComponent.propTypes = {
  tool: ToolType,
};

export default EmbedComponent;
