export const getStudentProgress = ({
  interactivePassed,
  interactiveTotal,
  isFinished,
}) => {
  const learnProgress = (interactivePassed / interactiveTotal) * 100;
  return { learnProgress, progressStatus: isFinished ? 'success' : 'normal' };
};
