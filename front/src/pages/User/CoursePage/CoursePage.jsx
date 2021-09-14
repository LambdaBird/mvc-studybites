import { Skeleton, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import Public from '@sb-ui/components/resourceBlocks/Public';
import { PAGE_SIZE } from '@sb-ui/pages/User/Lessons/LessonsList/constants';
import { getCourseLessons } from '@sb-ui/utils/api/v1/student';
import { USER_ENROLLED_COURSE } from '@sb-ui/utils/queries';
import { skeletonArray } from '@sb-ui/utils/utils';

import * as S from './CoursePage.styled';

const { Text } = Typography;

const CoursePage = () => {
  const { t } = useTranslation('user');

  const { id: courseId } = useParams();
  const { data: responseData, isLoading } = useQuery(
    [
      USER_ENROLLED_COURSE,
      {
        id: courseId,
      },
    ],
    getCourseLessons,
    {
      keepPreviousData: true,
    },
  );
  const { lessons } = responseData?.course || {};

  const author = useMemo(
    () =>
      `${responseData?.course.author?.firstName} ${responseData?.course.author?.lastName}`,
    [responseData?.course.author],
  );

  return (
    <S.Page>
      <S.BlockWrapper justify="start" align="top">
        {isLoading ? (
          <Skeleton loading={isLoading} paragraph={{ rows: 1 }} active />
        ) : (
          <>
            <S.TitleEllipsis
              ellipsis={{
                tooltip: true,
              }}
              level={2}
            >
              {responseData?.course.name}
            </S.TitleEllipsis>
            <S.InfoRow>{responseData?.course.description}</S.InfoRow>
            <S.InfoRow justify="space-between">
              <Text type="secondary">
                {t('course.by')} {author}
              </Text>
              <Text type="secondary">
                {responseData?.total} {t('course.lessons')}
              </Text>
            </S.InfoRow>
          </>
        )}
      </S.BlockWrapper>
      <S.LessonsWrapper>
        {isLoading
          ? skeletonArray(PAGE_SIZE).map((el) => (
              <S.CardWrapper key={el.id}>
                <Skeleton />
              </S.CardWrapper>
            ))
          : lessons?.length &&
            lessons.map((lesson) => (
              <S.CardWrapper key={lesson.id}>
                <Public resource={lesson} isCourseLesson />
              </S.CardWrapper>
            ))}
      </S.LessonsWrapper>
    </S.Page>
  );
};

export default CoursePage;