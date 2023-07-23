import spawnError from './spawnError.js';
import refreshToken from './refreshToken.js';
import navigate from './navigate.js';

const errorHandler = async (error) => {
  if (error.name === 'AxiosError') {
    const { response } = error;

    console.log(error);

    if (response.status === 401) {
      const { data } = response;
      const { message } = data;
      if (message === 'The email or password provided is incorrect!') {
        return spawnError({ name: 'Authentication Failed', message });
      }

      if (message === 'Access token expired!') {
        try {
          await refreshToken();
          window.location.reload();
        } catch (err) {
          navigate('/login.html');
          return spawnError({ name: 'Authentication Failed', message: 'Token Expired!' });
        }
      }

      if (message === 'Invalid access token!') {
        navigate('/login.html');
      }
    }
  }

  return spawnError(error);
};

export default errorHandler;
