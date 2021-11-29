import amplitude from 'amplitude-js';

export const initAmplitude = () => {
  if (process.env.NODE_ENV === 'production') {
    amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_KEY);
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
};

export const amplitudeLogEvent = (event, eventProperties) => {
  if (process.env.NODE_ENV === 'production') {
    amplitude.getInstance().logEvent(event, eventProperties);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[AMPLITUDE]: ${event}`, eventProperties || '');
  }
};
