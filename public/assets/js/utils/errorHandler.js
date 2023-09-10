import spawnError from './spawnError.js';

const errorHandler = async (error) => {
  const { name, response } = error;

  // API Error
  if (name === 'AxiosError') {
    const { status } = response;
    const { message } = response.data;

    // Error 500
    if (status === 500) {
      return spawnError({ name: 'API', message: 'Erro Interno do Servidor' });
    }

    // Error 401
    if (status === 401) {
      if (message === 'The email or password provided is incorrect!') {
        return spawnError({ name: 'Falha na Autenticação', message: 'Email ou senha está incorreto' });
      }

      if (message === 'Invalid access token!' || message === 'Access token expired!') {
        return spawnError({ name: 'Falha na Autenticação', message: 'Usuário não está logado' });
      }

      if (message === 'You need admin!') {
        return spawnError({ name: 'Falha na Autorização', message: 'Você precisa de privilégios de administrador' });
      }
    }

    // Error 400
    if (status === 400) {
      return spawnError({ name: 'Requisição Mal Feita', message });
    }

    return spawnError({ name: 'API', message });
  }

  return spawnError(error);
};

export default errorHandler;
