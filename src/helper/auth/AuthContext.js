import { createContext } from "react";
const AuthContext = createContext({
    isLoggedIn: false,
    userName: '',
    setIsLoggedIn: () => {},
    setUserName: () => {}
  });
  
export default AuthContext;
