import { useTranslation } from 'react-i18next';

import { LESSONS_NEW } from '@sb-ui/utils/paths';

import * as S from './LearnFooter.styled';

const LearnFooter = () => {
  const { t } = useTranslation('user');

  return (
    <S.Footer>
      <span>{t('learn_footer.text_before_link')}</span>
      <S.Link to={LESSONS_NEW}>{t('learn_footer.create_link')}.</S.Link>
      <span>{t('learn_footer.text_after_link')}</span>
    </S.Footer>
  );
};

export default LearnFooter;
