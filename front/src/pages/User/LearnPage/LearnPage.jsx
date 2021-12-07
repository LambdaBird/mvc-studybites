/* eslint no-use-before-define: "off" */
import { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import LearnFooter from '@sb-ui/components/atoms/LearnFooter';
import Header from '@sb-ui/components/molecules/Header';
import LearnContext from '@sb-ui/contexts/LearnContext';
import { BLOCKS_TYPE } from '@sb-ui/pages/User/LearnPage/BlockElement/types';
import InfoBlock from '@sb-ui/pages/User/LearnPage/InfoBlock';
import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { getEnrolledLesson, postLessonById } from '@sb-ui/utils/api/v1/student';
import { sbPostfix } from '@sb-ui/utils/constants';
import { HOME } from '@sb-ui/utils/paths';

import LearnChunk from './LearnChunk';
import { useLearnChunks } from './useLearnChunks';
import * as S from './LearnPage.styled';

const HISTORY_BACK = 'POP';

const LearnPage = () => {
  const { t } = useTranslation('user');
  const { id: lessonId } = useParams();
  const {
    handleInteractiveClick,
    chunks,
    isLoading,
    lesson,
    total,
    learnProgress,
    progressStatus,
    isFinishedLesson,
    handleElementClick,
  } = useLearnChunks({
    lessonId,
    getEnrolledLesson,
    postLessonById,
  });
  const history = useHistory();
  const location = useLocation();

  useEffect(
    () => () => {
      if (location.state?.fromEnroll && history.action === HISTORY_BACK) {
        history.replace(HOME);
      }
    },
    [history, location],
  );

  const handleInteractiveClickWrapper = useCallback(
    (param) => {
      switch (param.action) {
        case BLOCKS_TYPE.START:
          amplitudeLogEvent(AMPLITUDE_EVENTS.START_LESSON);
          break;
        case BLOCKS_TYPE.FINISH:
          amplitudeLogEvent(AMPLITUDE_EVENTS.COMPLETE_LESSON);
          break;
        default:
          amplitudeLogEvent(AMPLITUDE_EVENTS.ANSWER_INTERACTIVE);
          break;
      }
      handleInteractiveClick(param);
    },
    [handleInteractiveClick],
  );

  return (
    <>
      <Helmet>
        <title>
          {t('pages.learn', { name: lesson?.name })}
          {sbPostfix}
        </title>
      </Helmet>
      <Header
        hideOnScroll
        bottom={<S.Progress percent={learnProgress} status={progressStatus} />}
      />
      <S.Wrapper>
        <S.GlobalStylesLearnPage />
        <S.Row>
          <S.BlockCell>
            <LearnContext.Provider
              value={{
                handleInteractiveClick: handleInteractiveClickWrapper,
                chunks,
                id: lessonId,
              }}
            >
              <S.LearnWrapper onClick={handleElementClick}>
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

export default LearnPage;
