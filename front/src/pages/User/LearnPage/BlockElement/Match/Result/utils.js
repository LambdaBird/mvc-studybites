export const verifyAnswers = (results, answers) => {
  results.forEach(({ from, to }) => {
    const correctAnswer = answers.find((x) => x.from === from && x.to === to);
    if (correctAnswer) {
      correctAnswer.correct = true;
    }
  });
  return {
    correct: answers.every((answer) => answer.correct),
    results: answers,
  };
};
