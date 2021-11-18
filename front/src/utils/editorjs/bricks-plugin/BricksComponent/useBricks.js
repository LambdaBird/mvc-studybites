import { useCallback, useEffect, useRef, useState } from 'react';

import { setPropsInTool } from '@sb-ui/utils/editorjs/utils';

const addNewWordWrapper = ({ setWords, words, word }) => {
  setWords((prev) => {
    if (
      prev.find((x) => x.trim().toLowerCase() === word.toLowerCase()) ||
      words.find((x) => x.trim().toLowerCase() === word.toLowerCase())
    ) {
      return prev;
    }

    return [...prev, word];
  });
};

const removeWordWrapper = ({ setWords, word }) => {
  setWords((prev) => prev.filter((w) => w !== word));
};

export const useBricks = (tool) => {
  const { data } = tool;
  const questionInputRef = useRef(null);
  const wordInputRef = useRef(null);
  const additionalInputRef = useRef(null);

  const [words, setWords] = useState([]);
  const [additionalWords, setAdditionalWords] = useState([]);

  const handleAddNewWord = useCallback(
    (word) => {
      addNewWordWrapper({ setWords, words: additionalWords, word });
    },
    [additionalWords],
  );

  const handleRemoveWord = useCallback((word) => {
    removeWordWrapper({ setWords, word });
  }, []);

  const handleAddNewAdditionalWord = useCallback(
    (word) => {
      addNewWordWrapper({ setWords: setAdditionalWords, words, word });
    },
    [words],
  );

  const handleRemoveAdditionalWord = useCallback((word) => {
    removeWordWrapper({ setWords: setAdditionalWords, word });
  }, []);

  useEffect(() => {
    const { answers, words: dataWords, question } = data || {};

    if (answers) {
      setWords(answers);
    }
    if (dataWords) {
      setAdditionalWords(
        dataWords.filter((dataWord) => !answers.find((x) => x === dataWord)),
      );
    }
    if (question && questionInputRef?.current) {
      questionInputRef.current.innerHTML = question;
    }
  }, [data, questionInputRef]);

  useEffect(() => {
    setPropsInTool(tool, {
      words,
      additionalWords,
      allWords: [...words, ...additionalWords],
    });
  }, [words, additionalWords, tool]);

  useEffect(() => {
    setPropsInTool(tool, {
      question: data.question,
    });
  }, [data, tool]);

  const handleQuestionInput = useCallback(() => {
    setPropsInTool(tool, {
      question: questionInputRef?.current.innerHTML,
    });
  }, [questionInputRef, tool]);

  const handleQuestionKeyDown = useCallback(
    (event) => {
      if (
        event.key === 'Backspace' &&
        questionInputRef?.current?.innerText.trim().length === 0
      ) {
        tool.api.blocks.delete();
      }
    },
    [tool.api.blocks],
  );

  return {
    words,
    additionalWords,
    questionInputRef,
    wordInputRef,
    additionalInputRef,
    handleRemoveAdditionalWord,
    handleRemoveWord,
    handleAddNewAdditionalWord,
    handleAddNewWord,
    handleQuestionInput,
    handleQuestionKeyDown,
  };
};
