import amplitude from 'amplitude-js';

export const initAmplitude = () => {
  if (process.env.NODE_ENV === 'production') {
    amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_KEY);
  }
};

export const AMPLITUDE_EVENTS = {
  CREATE_LESSON: 'create_lesson',
  OPEN_LESSON: 'open_lesson',
  PREVIEW: 'open_preview',
  BLOCK_ADDED: 'block_added',
  SHARE_TO_WEB: 'share_to_web',
  OPEN_ANALYTICS: 'open_analytics',
  START_LESSON: 'start_lesson',
  ANSWER_INTERACTIVE: 'answer_interactive',
  COMPLETE_LESSON: 'complete_lesson',
};

export const amplitudeLogEvent = (event, meta) => {
  const eventMessage = meta ? `${event}-${meta}` : event;
  if (process.env.NODE_ENV === 'production') {
    amplitude.getInstance().logEvent(eventMessage);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[AMPLITUDE]: ${eventMessage}`);
  }
};
