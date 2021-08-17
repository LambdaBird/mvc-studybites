import Table from 'editorjs-table';
import hash from 'object-hash';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import HeaderTool from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';

import { BLOCKS_TYPE } from '@sb-ui/pages/User/LearnPage/BlockElement/types';
import ClosedQuestion from '@sb-ui/utils/editorjs/closed-question-plugin';
import Embed from '@sb-ui/utils/editorjs/embed-plugin';
import FillTheGap from '@sb-ui/utils/editorjs/fill-the-gap/plugin';
import Image from '@sb-ui/utils/editorjs/image-plugin';
import Next from '@sb-ui/utils/editorjs/next-plugin';
import Quiz from '@sb-ui/utils/editorjs/quiz-plugin';

const MAX_BODY_LENGTH = 4_000_000;

export const prepareEditorData = (blocks) =>
  blocks?.map(({ content, answer, type }) => {
    switch (type) {
      case BLOCKS_TYPE.QUIZ:
        return {
          ...content,
          data: {
            ...content?.data,
            answers: content?.data?.answers?.map(({ value }, i) => ({
              value,
              correct: answer?.results[i],
            })),
          },
        };
      case BLOCKS_TYPE.CLOSED_QUESTION:
        return {
          ...content,
          data: {
            ...content?.data,
            answers: answer?.results,
            explanation: answer?.explanation,
          },
        };
      case BLOCKS_TYPE.FILL_THE_GAP:
        return {
          ...content,
          data: {
            ...content?.data,
            answers: answer?.results,
          },
        };
      default:
        return content;
    }
  });

export const prepareBlocksDataForApi = (data, type) => {
  if (!data) {
    return null;
  }
  const { answers, explanation, ...sendData } = data || {};
  switch (type) {
    case BLOCKS_TYPE.QUIZ:
      return {
        ...sendData,
        answers: answers.map(({ value }) => ({ value })),
      };
    case BLOCKS_TYPE.CLOSED_QUESTION:
    case BLOCKS_TYPE.FILL_THE_GAP:
      return {
        ...sendData,
      };
    default:
      return data;
  }
};

const SKIP_BLOCKS = [
  BLOCKS_TYPE.EMBED,
  BLOCKS_TYPE.IMAGE,
  BLOCKS_TYPE.CLOSED_QUESTION,
];

export const prepareBlocksForApi = (blocks) =>
  blocks
    .map((block) => {
      const { id, type, data } = block;
      const answer = {};

      switch (type) {
        case BLOCKS_TYPE.QUIZ:
          answer.results = block?.data?.answers?.map((x) => x.correct);
          break;
        case BLOCKS_TYPE.CLOSED_QUESTION:
          answer.explanation = block?.data?.explanation;
          answer.results = block?.data?.answers;
          break;
        case BLOCKS_TYPE.FILL_THE_GAP:
          answer.results = block?.data?.answers;
          break;
        default:
          break;
      }

      return {
        type,
        revision: hash(block),
        content: {
          id,
          type,
          data: prepareBlocksDataForApi(data, type),
        },
        answer,
      };
    })
    .filter((block) =>
      SKIP_BLOCKS.every(
        (b) => !(block.type === b && block.content.data === null),
      ),
    )
    .filter((block) => JSON.stringify(block).length < MAX_BODY_LENGTH);

export const getConfig = (t) => ({
  holder: 'editorjs',
  tools: {
    image: {
      class: Image,
      inlineToolbar: true,
    },
    next: Next,
    quiz: {
      class: Quiz,
      inlineToolbar: true,
    },
    embed: {
      class: Embed,
      inlineToolbar: true,
    },
    warning: {
      class: Warning,
      inlineToolbar: true,
      config: {
        titlePlaceholder: t('editor_js.tools.warning_title'),
        messagePlaceholder: t('editor_js.tools.warning_message'),
      },
    },
    header: {
      class: HeaderTool,
      config: {
        placeholder: t('editor_js.header.placeholder'),
        levels: [1, 2, 3, 4, 5],
        defaultLevel: 2,
      },
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
    },
    delimiter: Delimiter,
    marker: Marker,

    table: {
      class: Table,
      inlineToolbar: true,
    },
    closedQuestion: {
      class: ClosedQuestion,
      inlineToolbar: true,
    },
    code: CodeTool,
    fillTheGap: FillTheGap,
  },
  i18n: {
    messages: {
      ui: {
        toolbar: {
          toolbox: {
            Add: t('editor_js.toolbar.toolbox_add'),
          },
        },
      },
      toolNames: {
        Text: t('editor_js.tool_names.text'),
        Next: t('editor_js.tool_names.next'),
      },
    },
  },
  plugins: [],
});
