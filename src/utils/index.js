const isAdmin = (token) => {
  if (token) {
    return true;
  }
  return false;
};

export { isAdmin };
