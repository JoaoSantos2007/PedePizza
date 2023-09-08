import spawnError from './spawnError.js';
import navigate from './navigate.js';

const errorHandler = async (error) => {
  if (error.name === 'AxiosError') {
    const { response } = error;

    if (response.status === 401) {
      const { data } = response;
      const { message } = data;
      if (message === 'The email or password provided is incorrect!') {
        return spawnError({ name: 'Authentication Failed', message });
      }

      if (message === 'Invalid access token!') {
        return navigate('/auth.html');
      }
    } else if (response.data) {
      const { data } = response;
      const { message } = data;

      return spawnError({ name: 'API', message });
    }
  }

  return spawnError(error);
};

export default errorHandler;
