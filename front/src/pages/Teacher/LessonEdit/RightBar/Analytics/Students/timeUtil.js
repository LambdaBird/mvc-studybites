import { DEFAULT_CODE } from '@sb-ui/i18n';

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat(DEFAULT_CODE, { numeric: 'auto' });

export const getRelativeTime = (firstTime, secondTime = Date.now()) => {
  const elapsed = firstTime - secondTime;
  const unit = Object.keys(units).find(
    (u) => Math.abs(elapsed) > units[u] || u === 'second',
  );
  return rtf.format(Math.round(elapsed / units[unit]), unit);
};
