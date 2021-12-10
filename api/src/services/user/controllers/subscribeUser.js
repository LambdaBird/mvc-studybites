const options = {
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        pathname: { type: 'string' },
      },
    },

    response: {
      '4xx': { $ref: '4xx#' },
      '5xx': { $ref: '5xx#' },
    },
  },

  async preHandler({ body: { email } }) {
    this.validateEmail({ email });
  },
};

async function handler({ body, socket, headers }) {
  const {
    models: { Subscribe },
  } = this;
  const userIp = socket.remoteAddress || headers['x-forwarded-for'];

  await Subscribe.createSubscribe({
    email: body.email,
    pathname: body.pathname,
    ip: userIp,
  });

  return { success: true };
}

export default { options, handler };
