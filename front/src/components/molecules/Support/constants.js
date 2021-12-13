export const TELEGRAM_USER = 'tmaniac';
export const MAIL = 'studybites@lambdabird.com';
export const MAIL_REPORT = `mailto:${MAIL}?subject=Bug%20Report&body=Issue%20description%3A%0A%0A%0ASteps%20to%20reproduce%20the%20issue%3A%0A1.%0A2.%0A%0A%0AWhat's%20the%20expected%20result%3F%0A%0A%0AWhat's%20the%20actual%20result%3F%0A%0A%0AAdditional%20details%20%2F%20screenshot`;
export const emailRules = [
  {
    type: 'email',
    message: 'The input is not valid E-mail!',
  },
  {
    required: true,
    message: 'Please input your E-mail!',
  },
];
