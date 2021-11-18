export const createStartBlock = (isSolved) => ({
  blockId: 'block-start-id',
  content: {
    type: 'start',
  },
  type: 'start',
  isSolved,
});

export const createParagraphBlock = (id, text) => ({
  answer: {},
  blockId: `block-${id}`,
  content: {
    id: `content-${id}`,
    data: { text },
    type: 'paragraph',
  },
  createdAt: '2021-07-14T20:37:29.848Z',
  updatedAt: '2021-07-14T20:37:29.848Z',
  revision: `hashRevision${id}`,
  type: 'paragraph',
  weight: null,
});

export const createNextBlock = (id, isSolved) => ({
  answer: {},
  blockId: `block-${id}`,
  content: {
    id: `content-${id}`,
    data: {},
    type: 'next',
  },
  createdAt: '2021-07-14T20:37:29.848Z',
  updatedAt: '2021-07-14T20:37:29.848Z',
  revision: `hashTest${id}`,
  type: 'next',
  weight: null,
  isSolved,
});

export const createQuizBlock = (id, results) => ({
  blockId: `block-${id}`,
  content: {
    data: {
      answers: results.map((x, i) => ({ value: `Value ${i + 1}` })),
      question: `Answer for question ${id}?`,
    },
    id: `content-${id}`,
    type: 'quiz',
  },
  isSolved: false,
  revision: `hashTest${id}`,
  type: 'quiz',
});

export const createFinishBlock = (isSolved) => ({
  content: {
    id: 'finish',
    type: 'finish',
  },
  type: 'finish',
  isSolved,
  blockId: `block-finish-id`,
  answer: {},
});

export const createQuizResultBlock = (id, results, response) => ({
  answer: { results },
  blockId: `block-${id}`,
  content: {
    data: {
      answers: results.map((x, i) => ({
        value: `Value ${i + 1}`,
      })),
      question: `Answer for question ${id}?`,
    },
    id: `content-${id}`,
    type: 'quiz',
  },
  isSolved: true,
  revision: `hashTest${id}`,
  type: 'quiz',
  reply: {
    response,
  },
});
