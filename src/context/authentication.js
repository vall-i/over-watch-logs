import React from 'react';

const authContext = React.createContext({
  authenticated: false,
  logout: () => {},
  login: () => {},
});

export default authContext;
