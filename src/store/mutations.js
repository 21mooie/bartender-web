export const REQUEST_CHANGE_USERNAME = `REQUEST_CHANGE_USERNAME`;
export const CHANGE_USERNAME = `CHANGE_USERNAME`;
export const CREATE_USER = `CREATE_USER`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;

export const requestChangeUsername = (uid, oldUsername, newUsername) => ({
  type: REQUEST_CHANGE_USERNAME,
  uid,
  oldUsername,
  newUsername
});

export const changeUsername = (uid, oldUsername, newUsername) => ({
  type: CHANGE_USERNAME,
  uid,
  oldUsername,
  newUsername
});

export const createNewUser = (username, password) => ({
  type: CREATE_USER,
  username,
  password
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password
});

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  session,
  authenticated: status
});
