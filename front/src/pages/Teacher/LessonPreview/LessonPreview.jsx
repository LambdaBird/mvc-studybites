import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import LearnFooter from '@sb-ui/components/atoms/LearnFooter';
import Header from '@sb-ui/components/molecules/Header';
import LearnContext from '@sb-ui/contexts/LearnContext';
import { useLessonLearn } from '@sb-ui/pages/Teacher/LessonPreview/useLessonLearn';
import InfoBlock from '@sb-ui/pages/User/LearnPage/InfoBlock';
import LearnChunk from '@sb-ui/pages/User/LearnPage/LearnChunk';
import * as S from '@sb-ui/pages/User/LearnPage/LearnPage.styled';
import { useLearnChunks } from '@sb-ui/pages/User/LearnPage/useLearnChunks';
import { sbPostfix } from '@sb-ui/utils/constants';

const LessonPreview = () => {
  const { t } = useTranslation('teacher');
  const { id: lessonId } = useParams();

  const { postLessonByIdPreviewNew, getLessonByIdPreview } = useLessonLearn();

  const {
    handleInteractiveClick,
    chunks,
    isLoading,
    lesson,
    total,
    learnProgress,
    isFinishedLesson,
  } = useLearnChunks({
    lessonId,
    getEnrolledLesson: getLessonByIdPreview,
    postLessonById: postLessonByIdPreviewNew,
  });

  return (
    <>
      <Helmet>
        <title>
          {t('pages.lesson_preview')}
          {sbPostfix}
        </title>
      </Helmet>
      <Header hideOnScroll bottom={<S.Progress percent={learnProgress} />} />
      <S.Wrapper>
        <S.GlobalStylesLearnPage />
        <S.Row>
          <S.BlockCell>
            <LearnContext.Provider
              value={{
                handleInteractiveClick,
                chunks,
                id: lessonId,
              }}
            >
              <S.LearnWrapper>
                <InfoBlock
                  isLoading={isLoading}
                  total={total}
                  lesson={lesson}
                />
                {chunks.map((chunk, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <LearnChunk key={index} chunk={chunk} />
                ))}
              </S.LearnWrapper>
            </LearnContext.Provider>
          </S.BlockCell>
        </S.Row>
        {isFinishedLesson && <LearnFooter />}
      </S.Wrapper>
    </>
  );
};

export default LessonPreview;
