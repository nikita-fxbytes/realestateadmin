import React, { useContext } from 'react'
import AuthContext from './AuthContext';
import { logout } from '../CommonFunction';

const LogOutLogic = () => {
    const { setIsLoggedIn } = useContext(AuthContext);
    const logOut = () =>{
        setIsLoggedIn(false)
        logout();
    }
  return {
    logOut
  }
}

export default LogOutLogic
