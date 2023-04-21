import { BrowserRouter as Router,  Routes,  Route } from "react-router-dom";
import PropertyRoutes from './modules/property/PropertyRoutes';
import DashBoard from './pages/dashboard/DashBoard';
import RoleRoutes from './modules/role/RoleRoutes';
import Sidebar from './components/layouts/Sidebar';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import UserRoutes from "./modules/user/UserRoutes";
import Login from './pages/auth/Login';
import MessageState from "./components/message/context/MessageState";
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
              <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="dashboard" element={<DashBoard/>}></Route>
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
