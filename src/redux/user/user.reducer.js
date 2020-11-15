const INITIAL_STATE = {
  user: null,
};

export const loginUser = (user) => ({
  type: 'LOGIN_USER',
  payload: user,
});

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        loggedin: true,
        user: action.payload,
      };
    case 'TEST':
      return {
        ...state,
        whatev: true,
        jj: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
