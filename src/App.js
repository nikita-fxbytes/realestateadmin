import Footer from './components/layouts/Footer';
import UserRoutes from "./modules/user/UserRoutes";
import RoleRoutes from './modules/role/RoleRoutes';
import Sidebar from './components/layouts/Sidebar';
import Message from "./components/message/Message";
import AuthContext from './helper/auth/AuthContext';
import withAuth from './helper/middleware/withAuth';
import {getUserToken} from './helper/CommonFunction';
import Header from './components/layouts/header/Header';
import { lazy, Suspense, useContext, useEffect } from 'react';
import PropertyRoutes from './modules/property/PropertyRoutes';
import MessageState from "./components/message/context/MessageState";
import { BrowserRouter as Router,  Routes,  Route, Navigate } from "react-router-dom";
import InquiryRoutes from './modules/inquiry/InquiryRoutes';

const Login = lazy(() => import('./pages/auth/login/Login'));
const AuthDashBoard = lazy(() => import('./pages/dashboard/DashBoard').then(module => ({ default: withAuth(module.default) })));
const AuthProfile = lazy(() => import('./pages/auth/profile/Profile').then(module => ({ default: withAuth(module.default) })));
const AuthBestSeller = lazy(() => import('./modules/bestseller/BestSeller').then(module => ({ default: withAuth(module.default) })));
function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  useEffect(()=>{
    checkIsLoggedIn();
  },[]);
  // Check login
  const checkIsLoggedIn=() =>{
    const token = getUserToken();
    if(token){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }
  // End
  return (
    <MessageState>
      <Router>
        <div id="wrapper">
          {isLoggedIn && <Sidebar/>}
          <div id={isLoggedIn ? 'content-wrapper':''} className="d-flex flex-column w-100">
          <div id="content">
            {isLoggedIn && <Header/>}
            <div className="container-fluid">
              <Message/>
              <Routes>
              <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/dashboard" />
                    ) : (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Login/>
                      </Suspense>
                    )
                  }
                />
                <Route path="dashboard" element={<Suspense fallback={<div>Loading...</div>}><AuthDashBoard/></Suspense>} />
                <Route path="/properties/*" element={<PropertyRoutes/>} />
                <Route path="/roles/*" element={<RoleRoutes/>} />
                <Route path="/users/*" element={<UserRoutes/>} />
                <Route path="/inquiries/*" element={<InquiryRoutes/>}/>
                <Route path="profile" element={<Suspense fallback={<div>Loading...</div>}><AuthProfile/></Suspense>} />
                <Route path="best-seller" element={<Suspense fallback={<div>Loading...</div>}><AuthBestSeller/></Suspense>} />
                
              </Routes>
            </div>
          </div>
          {isLoggedIn && <Footer/>}
          </div>
        </div>
      </Router>
    </MessageState>
  );
}
export default App;
