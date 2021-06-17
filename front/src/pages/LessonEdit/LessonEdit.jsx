import { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Typography, message } from 'antd';
import hash from 'object-hash';
import { useTranslation } from 'react-i18next';
import EditorJS from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import { useMutation } from 'react-query';
import { RedoOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import Header from '@sb-ui/components/molecules/Header';
import { createLesson } from '@sb-ui/utils/api/v1/lesson';
import { Statuses } from '@sb-ui/pages/TeacherHome/LessonsDashboard/constants';
import * as S from './LessonEdit.styled';
import {
  HeaderButtons,
  InputTitle,
  MoveButton,
  PublishButton,
  RowStyled,
  SaveButton,
  StudentsCount,
  TextLink,
} from './LessonEdit.styled';

const { TextArea } = Input;

let editorJS;

const LessonEdit = () => {
  const { t } = useTranslation();
  const [name, setName] = useState(t('lesson_edit.title.default'));
  const [description, setDescription] = useState('');
  useEffect(() => {
    editorJS = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      onReady: () => {
        // eslint-disable-next-line no-new
        new Undo({ editor: editorJS });
        // eslint-disable-next-line no-new
        new DragDrop(editorJS);
      },
      plugins: [],
    });
  }, []);

  const { mutate } = useMutation(createLesson, {
    onError: (e) => {
      message.error({
        content: e.message,
        key: e.key,
        duration: 2,
      });
    },
  });

  const handleSave = async () => {
    try {
      const { blocks } = await editorJS.save();
      mutate({
        name,
        description,
        status: Statuses.DRAFT,
        blocks: blocks.map((block) => ({
          ...block,
          revision: hash(block),
        })),
      });
    } catch (e) {
      console.error('Editor JS error: ', e);
    }
  };

  return (
    <>
      <Header>
        <HeaderButtons>
          <Button>{t('lesson_edit.buttons.preview')}</Button>
          <PublishButton type="primary">
            {t('lesson_edit.buttons.publish')}
          </PublishButton>
        </HeaderButtons>
      </Header>
      <S.Page>
        <S.StyledRow align="top">
          <S.LeftCol span={12}>
            <InputTitle
              type="text"
              placeholder={t('lesson_edit.title.placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div id="editorjs" />
          </S.LeftCol>
          <S.RightCol span={12}>
            <RowStyled gutter={[32, 32]}>
              <Col span={24}>
                <SaveButton
                  onClick={handleSave}
                  icon={<SaveOutlined />}
                  type="primary"
                  size="large"
                >
                  {t('lesson_edit.buttons.save')}
                </SaveButton>
              </Col>
              <Col span={12}>
                <MoveButton icon={<UndoOutlined />} size="medium">
                  {t('lesson_edit.buttons.back')}
                </MoveButton>
              </Col>
              <Col span={12}>
                <MoveButton icon={<RedoOutlined />} size="medium">
                  {t('lesson_edit.buttons.forward')}
                </MoveButton>
              </Col>
            </RowStyled>
            <RowStyled gutter={[0, 10]}>
              <Col span={24}>
                <TextLink underline>{t('lesson_edit.links.invite')}</TextLink>
              </Col>
              <Col span={24}>
                <TextLink underline>{t('lesson_edit.links.students')}</TextLink>
                <StudentsCount showZero count={4} />
              </Col>
              <Col span={24}>
                <TextLink underline>
                  {t('lesson_edit.links.analytics')}
                </TextLink>
              </Col>
              <Col span={24}>
                <Typography.Link type="danger" underline>
                  {t('lesson_edit.links.archive')}
                </Typography.Link>
              </Col>
            </RowStyled>
            <Row gutter={[0, 16]}>
              <Col span={24}>{t('lesson_edit.description')}</Col>
              <Col span={24}>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  showCount
                  maxLength={140}
                />
              </Col>
            </Row>
          </S.RightCol>
        </S.StyledRow>
      </S.Page>
    </>
  );
};

export default LessonEdit;
