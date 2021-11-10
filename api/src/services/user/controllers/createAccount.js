import { v4 } from 'uuid';
import { hashPassword } from '../../../../utils/salt';

const options = {
  schema: {
    response: {
      '4xx': { $ref: '4xx#' },
      '5xx': { $ref: '5xx#' },
    },
  },
};

async function handler() {
  const {
    models: { User },
    createAccessToken,
    createRefreshToken,
  } = this;
  const hash = await hashPassword(v4());

  const { id } = await User.createOne({
    userData: {
      firstName: '',
      lastName: '',
      password: hash,
    },
  });

  const accessToken = createAccessToken(this, id);
  const refreshToken = createRefreshToken(this, id);

  return {
    accessToken,
    refreshToken,
  };
}

export default { options, handler };
