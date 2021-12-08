import { DEFAULT_CODE } from '@sb-ui/i18n';

const escapeRegExp = (string) => string.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&');
export const uuidRegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, [ms]);
  });

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const getPasswordStrength = (password = '') => {
  if (password.length === 0) {
    return -1;
  }
  const options = [
    {
      id: 0,
      value: 'Too weak',
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: 'Weak',
      minDiversity: 2,
      minLength: 6,
    },
    {
      id: 2,
      value: 'Medium',
      minDiversity: 4,
      minLength: 8,
    },
    {
      id: 3,
      value: 'Strong',
      minDiversity: 4,
      minLength: 10,
    },
  ];
  const rules = [
    new RegExp(/[a-z]/),
    new RegExp(/[A-Z]/),
    new RegExp(/[0-9]/),
    new RegExp(`[${escapeRegExp('!@#$%^&*')}]`),
  ];
  const passedRules = rules.filter((rule) => rule.test(password));
  const fulfilledOptions = options
    .filter((option) => passedRules.length >= option.minDiversity)
    .filter((option) => password.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id);
  return fulfilledOptions[0].id;
};

export const getProgressEnrolledLesson = (blocks, totalBlocks) =>
  (blocks?.length / totalBlocks).toFixed(2) * 100 || 0;

export const formatDate = (date, localeCode = DEFAULT_CODE) =>
  date &&
  new Intl.DateTimeFormat(localeCode, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

export const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = 0; i < shuffledArray.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};
