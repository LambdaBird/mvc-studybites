import { resources, roles } from '../../../config';
import { options as updateOptions } from './updateStatus';

const options = {
  async onRequest(req) {
    await this.auth({ req });
  },
  async preHandler({ user: { id: userId }, params: { lessonId: resourceId } }) {
    await this.access({
      userId,
      resourceId,
      resourceType: resources.LESSON.name,
      roleId: roles.MAINTAINER.id,
    });
  },
};

async function handler() {
  return {
    POST: {
      body: updateOptions.schema.body,
    },
  };
}

export default { options, handler };
