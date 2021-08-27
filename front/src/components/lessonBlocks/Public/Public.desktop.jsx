import { Button, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { PublicLessonType } from '@sb-ui/components/lessonBlocks/types';
import DefaultLessonImage from '@sb-ui/resources/img/lesson.svg';

import { useLesson } from './useLesson';
import {
  AuthorAvatar,
  AuthorContainer,
  AuthorName,
  DescriptionText,
  EnrollRow,
  LeftContent,
  LessonImg,
  MainSpace,
  RightContent,
  RowEllipsis,
  TitleEllipsis,
} from './Public.desktop.styled';

const PublicDesktop = ({ lesson }) => {
  const { t } = useTranslation('user');

  const { name, description, isEnrolled, image } = lesson;
  const { fullName, firstNameLetter, handleContinueLesson, handleEnroll } =
    useLesson(lesson);

  return (
    <>
      <MainSpace size="large" wrap={false}>
        <LeftContent>
          <div>
            <LessonImg
              fallback={DefaultLessonImage}
              src={image || DefaultLessonImage}
              alt="Lesson"
            />
            <AuthorContainer>
              <AuthorAvatar>{firstNameLetter}</AuthorAvatar>
              <AuthorName>{fullName}</AuthorName>
            </AuthorContainer>
          </div>
        </LeftContent>
        <RightContent>
          <RowEllipsis>
            <Col span={24}>
              <TitleEllipsis
                ellipsis={{
                  tooltip: true,
                }}
                level={3}
              >
                {name}
              </TitleEllipsis>
            </Col>
            <Col span={24}>
              <DescriptionText
                ellipsis={{
                  tooltip: true,
                  rows: 2,
                }}
              >
                {description}
              </DescriptionText>
            </Col>
          </RowEllipsis>
          <EnrollRow justify="end">
            {isEnrolled ? (
              <Button type="primary" onClick={handleContinueLesson}>
                {t('home.ongoing_lessons.continue_button')}
              </Button>
            ) : (
              <Button size="medium" type="secondary" onClick={handleEnroll}>
                {t('home.open_lessons.enroll_button')}
              </Button>
            )}
          </EnrollRow>
        </RightContent>
      </MainSpace>
    </>
  );
};

PublicDesktop.propTypes = {
  lesson: PublicLessonType.isRequired,
};

export default PublicDesktop;
