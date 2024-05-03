import { createContext } from "react";
export const AppContext = createContext({
  isLoggedIn: false,
  user: {},
  message: null,
  consultationDetails: null,
  setLogin: () => {},
  setLogout: () => {},
  handleMessage: () => {},
  resetMessage: () => {},
});
