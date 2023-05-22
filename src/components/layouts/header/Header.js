import LayoutMessages from "../LayoutMessages";
import HeaderLogic from "./HeaderLogic";
import { NavLink } from "react-router-dom";
const Header = () => {
    const {logOut, userName } = HeaderLogic();//Logic 
    const {profile, settings, logout} = LayoutMessages
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userName??''}</span>
                        <img className="img-profile rounded-circle"
                            src={process.env.PUBLIC_URL + '/img/undraw_profile.svg'}/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <NavLink className="dropdown-item" to="profile">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            {profile}
                        </NavLink>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            {settings}
                        </a>
                        
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={logOut}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            {logout}
                        </a>
                    </div>
                </li>
            </ul>
        </nav>    
    );
}

export default Header;
