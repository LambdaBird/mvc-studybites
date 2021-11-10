const alphabet = [
  '🇦',
  '🇧',
  '🇨',
  '🇩',
  '🇪',
  '🇫',
  '🇬',
  '🇭',
  '🇮',
  '🇯',
  '🇰',
  '🇱',
  '🇲',
  '🇳',
  '🇴',
  '🇵',
  '🇶',
  '🇷',
  '🇸',
  '🇹',
  '🇺',
  '🇻',
  '🇼',
  '🇽',
  '🇾',
  '🇿',
];
const ALPHABET_START_CODE = 65;

export const getCountryEmoji = (countryCode) =>
  countryCode
    .toUpperCase()
    .split('')
    .map((letter) => letter.charCodeAt(0))
    .map((letterCode) => alphabet[letterCode - ALPHABET_START_CODE])
    .join('');
