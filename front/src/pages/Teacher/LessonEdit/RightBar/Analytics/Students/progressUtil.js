import { countriesZones } from '@sb-ui/utils/countriesZones';

const getStudentProgress = (results, interactiveTotal) => {
  const interactivePassed = results?.filter(
    (result) => result.action !== 'start' && result.action !== 'finish',
  )?.length;
  const isFinished = results?.[results.length - 1]?.action === 'finish';

  const isZeroes = interactivePassed === 0 && interactiveTotal === 0;

  const learnProgress = isZeroes
    ? 0
    : (interactivePassed / interactiveTotal) * 100;
  return {
    learnProgress:
      isFinished || (isZeroes && results?.[0]?.action === 'start')
        ? 100
        : learnProgress,
    progressStatus: isFinished ? 'success' : 'normal',
  };
};

const getCountry = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions()?.timeZone;
  const countryCode = countriesZones.timezones[timeZone]?.c?.[0] || 'XX';
  const country = countriesZones.countries[countryCode] || '';
  return {
    countryCode,
    country,
  };
};

export const getStudentsWithProgress = (students, totalInteractiveBlocks) =>
  students
    .map((student) => ({
      ...student,
      ...getStudentProgress(student.results, totalInteractiveBlocks),
    }))
    .map((student) => ({
      ...student,
      ...getCountry(),
    }))
    .sort((a, b) => b.learnProgress - a.learnProgress)
    .sort((a, b) => {
      if (a.progressStatus === 'success') {
        return -1;
      }
      if (b.progressStatus === 'success') {
        return 1;
      }
      return 0;
    });
