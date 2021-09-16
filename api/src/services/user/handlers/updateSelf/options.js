import { userConstants } from '../../../../config';

export const updateSelfOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: userConstants.MAX_FIRST_NAME_LENGTH,
        },
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: userConstants.MAX_LAST_NAME_LENGTH,
        },
        email: { type: 'string', minLength: 1 },
      },
    },
    response: {
      '4xx': { $ref: '4xx#' },
      '5xx': { $ref: '5xx#' },
    },
  },
  async onRequest(req) {
    await this.auth({ req });
  },
  async preHandler({ body: { email } }) {
    this.validateEmail({ email });
  },
};
