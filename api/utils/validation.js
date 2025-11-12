export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (fields, body) => {
  const missing = [];
  for (const field of fields) {
    if (!body[field]) {
      missing.push(field);
    }
  }
  return missing;
};