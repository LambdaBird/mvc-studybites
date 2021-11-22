import { resources, roles } from '../src/config';
import build from '../src/app';

const addLessons = async ({ name, description, status, userId }) => {
  const app = await build();
  const { Lesson, UserRole } = app.models;
  return Lesson.transaction(async (trx) => {
    const lesson = await Lesson.query(trx)
      .insert({
        name,
        description,
        status,
      })
      .returning('*');
    await UserRole.query(trx)
      .insert({
        user_id: userId,
        role_id: roles.MAINTAINER.id,
        resource_type: resources.LESSON.name,
        resource_id: lesson.id,
      })
      .returning('*');

    return lesson;
  });
};

addLessons({
  name: 'One more lesson',
  description: 'Hello 444',
  status: 'Public',
  userId: 2,
});
