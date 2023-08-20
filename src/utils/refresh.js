// eslint-disable-next-line import/no-cycle
import Token from '../models/tokenModel.js';

const refresh = async (refreshToken) => {
  try {
    const email = await Token.verifyRefreshToken(refreshToken);

    const newAccessToken = Token.createAccessToken(email);
    const newRefreshToken = await Token.createRefreshToken(email);

    return { newAccessToken, newRefreshToken };
  } catch (err) {
    return err;
  }
};

export default refresh;
