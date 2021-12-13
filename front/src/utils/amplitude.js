import amplitude from 'amplitude-js';

const AMPLITUDE_KEY = '92d390dadd16e1d67e3e7bbfead14b7b';

export const initAmplitude = () => {
  if (process.env.NODE_ENV === 'production') {
    amplitude.getInstance().init(AMPLITUDE_KEY, null, {
      includeUtm: true,
      includeReferrer: true,
    });
  }
};

export const AMPLITUDE_EVENTS = {
  CREATE_LESSON: 'Create Lesson',
  OPEN_LESSON: 'Open Lesson',
  PREVIEW: 'Open Preview',
  BLOCK_ADDED: 'Block Added',
  SHARE_TO_WEB: 'Share to Web',
  OPEN_ANALYTICS: 'Open Analytics',
  START_LESSON: 'Start Lesson',
  ANSWER_INTERACTIVE: 'Answer Interactive',
  COMPLETE_LESSON: 'Complete Lesson',
  SUBSCRIBE: 'Subscribe',
  START_SESSION: 'Start Session',
  LAUNCH_FIRST_TIME: 'Launch First Time',
};

export const amplitudeLogEvent = (event, eventProperties) => {
  if (process.env.NODE_ENV === 'production') {
    amplitude.getInstance().logEvent(event, eventProperties);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[AMPLITUDE]: ${event}`, eventProperties || '');
  }
};
