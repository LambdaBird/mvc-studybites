import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { LESSONS_NEW } from '@sb-ui/utils/paths';

import * as S from './LearnFooter.styled';

const LearnFooter = () => {
  const history = useHistory();
  const { t } = useTranslation('user');

  const handleLinkClick = (event) => {
    event.preventDefault();
    history.push(LESSONS_NEW);
  };

  return (
    <S.Footer>
      <span>{t('learn_footer.text_before_link')}</span>
      <S.Link href={LESSONS_NEW} onClick={handleLinkClick}>
        {t('learn_footer.create_link')}.
      </S.Link>
      <span>{t('learn_footer.text_after_link')}</span>
    </S.Footer>
  );
};

export default LearnFooter;
