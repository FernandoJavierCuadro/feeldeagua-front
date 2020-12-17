const getUser = (credentials) => {
  return {
    type: "GET_USER",
    payload: credentials,
  };
};

export { getUser };
