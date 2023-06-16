const analyzeError = (err) => {
  let status = 500;
  const errorName = err.name;

  const error = {
    name: errorName,
    message: err.message,
  };

  if (errorName === 'ValidationError') {
    status = 404;
  }

  return { error, status };
};

export default analyzeError;
