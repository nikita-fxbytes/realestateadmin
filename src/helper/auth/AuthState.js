import AuthContext from "./AuthContext";
import { useState } from "react";

const AuthState = ({children}) =>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, userName, setUserName}}>
      {children}
    </AuthContext.Provider>  
  );
}

export default AuthState;