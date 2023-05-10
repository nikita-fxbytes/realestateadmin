import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const isLoggedIn = 'd';
    if (isLoggedIn) {
      return <Component {...props} />;
    } else {
      return <Navigate  to="/" />;
    }
  };
  return AuthRoute;
};

export default withAuth;