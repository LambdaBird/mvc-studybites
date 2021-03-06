import { Tooltip } from 'antd';
import T from 'prop-types';
import { useTranslation } from 'react-i18next';

import { camelToSnakeCase } from '@sb-ui/utils/editorjs/utils';

import * as S from './BaseHeader.styled';

const BaseHeader = ({ toolName, noHint = false }) => {
  const { t } = useTranslation('editorjs');
  const snakeCasedToolName = camelToSnakeCase(toolName);
  const title = t(`tools.${snakeCasedToolName}.title`);
  const hint = t(`tools.${snakeCasedToolName}.hint`);

  return (
    <S.TitleWrapper>
      <S.BaseText>{title}</S.BaseText>
      {!noHint && (
        <>
          <S.Hint>{hint}</S.Hint>
          <S.HintDesktop>
            <Tooltip trigger="click" placement="left" title={hint}>
              <S.Question />
            </Tooltip>
          </S.HintDesktop>
        </>
      )}
    </S.TitleWrapper>
  );
};

BaseHeader.propTypes = {
  toolName: T.string,
  noHint: T.bool,
};

export default BaseHeader;
