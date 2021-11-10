import getLessons from './controllers/getLessons';
import lessonsOptions from './controllers/lessonsOptions';
import getLesson from './controllers/getLesson';
import lessonOptions from './controllers/lessonOptions';
import enrollLesson from './controllers/enrollLesson';
import enrollOptions from './controllers/enrollOptions';
import forceEnrollLesson from './controllers/forceEnrollLesson';

export async function router(instance) {
  instance.get('/', getLessons.options, getLessons.handler);
  instance.options('/', lessonsOptions.options, lessonsOptions.handler);

  instance.get('/:lessonId', getLesson.options, getLesson.handler);
  instance.options('/:lessonId', lessonOptions.options, lessonOptions.handler);

  instance.post(
    '/:lessonPublicId/force-enroll',
    forceEnrollLesson.options,
    forceEnrollLesson.handler,
  );

  instance.post(
    '/:lessonId/enroll',
    enrollLesson.options,
    enrollLesson.handler,
  );
  instance.options(
    '/:lessonId/enroll',
    enrollOptions.options,
    enrollOptions.handler,
  );
}
