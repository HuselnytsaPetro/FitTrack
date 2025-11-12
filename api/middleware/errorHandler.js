export const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message,
    });
  }

  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Resource already exists',
      details: err.detail,
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      error: 'Invalid reference',
      details: 'Referenced resource does not exist',
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};
