import { Navigate } from 'react-router-dom';
import {getUserToken} from '../CommonFunction'
const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const isLoggedIn = getUserToken();
    if (isLoggedIn) {
      return <Component {...props} />;
    } else {
      return <Navigate  to="/" />;
    }
  };
  return AuthRoute;
};

export default withAuth;