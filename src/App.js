import { lazy, Suspense } from 'react'
import { BrowserRouter as Router,  Routes,  Route } from "react-router-dom";
import PropertyRoutes from './modules/property/PropertyRoutes';
import RoleRoutes from './modules/role/RoleRoutes';
import Sidebar from './components/layouts/Sidebar';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import UserRoutes from "./modules/user/UserRoutes";
import Login from './pages/auth/login/Login';
import MessageState from "./components/message/context/MessageState";
import Message from "./components/message/Message";
import withAuth from './helper/middleware/withAuth ';
const AuthDashBoard = lazy(() => import('./pages/dashboard/DashBoard').then(module => ({ default: withAuth(module.default) })));

function App() {
  return (
    <MessageState>
      <Router>
        <div id="wrapper">
          <Sidebar/>
          <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header/>
            <div className="container-fluid">
              <Message/>
              <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="dashboard" element={<Suspense fallback={<div>Loading...</div>}><AuthDashBoard/></Suspense>} />
                <Route path="/properties/*" element={<PropertyRoutes/>} />
                <Route path="/roles/*" element={<RoleRoutes/>} />
                <Route path="/users/*" element={<UserRoutes/>} />
              </Routes>
            </div>
          </div>
          <Footer/>
          </div>
        </div>
      </Router>
    </MessageState>
   
  );
}

export default App;
