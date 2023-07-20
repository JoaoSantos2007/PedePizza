import spawnError from './spawnError.js';

const errorHandler = (error) => {
  if (error.name === 'AxiosError') {
    const { response } = error;

    if (response.status === 401) {
      const { data } = response;
      const { message } = data;
      if (message === 'The email or password provided is incorrect!') {
        return spawnError({ name: 'Authentication Failed', message });
      }
    }
  }

  return spawnError(error);
};

export default errorHandler;
