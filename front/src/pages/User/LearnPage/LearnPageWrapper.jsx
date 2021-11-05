import { Button, Result } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

import { LearnPage } from '@sb-ui/pages/User';
import { enrollLesson } from '@sb-ui/utils/api/v1/lessons';
import { postCreateAccount } from '@sb-ui/utils/api/v1/user';
import { getJWTAccessToken, setJWT } from '@sb-ui/utils/jwt';
import { HOME } from '@sb-ui/utils/paths';

const LearnPageWrapper = () => {
  const { id: lessonId } = useParams();
  const history = useHistory();
  const { t } = useTranslation('common');
  const isLoggedIn = getJWTAccessToken();
  const [isEnrolled, setEnrolled] = useState(false);

  const { mutate: createAccount } = useMutation(postCreateAccount, {
    onSuccess: ({ data }) => {
      setJWT(data);
    },
  });

  const { mutate: enrollToLesson, isError } = useMutation(enrollLesson, {
    onSuccess: () => {
      setEnrolled(true);
    },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      createAccount();
    } else {
      enrollToLesson(lessonId);
    }
  }, [enrollToLesson, lessonId, isLoggedIn, createAccount]);

  const handleGoBack = useCallback(() => {
    history.push(HOME);
  }, [history]);

  return (
    <>
      {isError ? (
        <Result
          status="404"
          subTitle={t('errors_page.lesson_not_exist')}
          extra={
            <Button onClick={handleGoBack} type="primary">
              {t('errors_page.back_home_button')}
            </Button>
          }
        />
      ) : (
        isEnrolled && <LearnPage />
      )}
    </>
  );
};

export default LearnPageWrapper;
