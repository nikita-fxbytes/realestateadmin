import { NavLink } from "react-router-dom"
import LayoutMessages from "./LayoutMessages"
const Sidebar = () => {
    const {dashboard, property, user, role, inquiry, best_seller} = LayoutMessages
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="dashboard">
                <div className="sidebar-brand-icon">
                    <img src={process.env.PUBLIC_URL +'/img/logo.png'}/>
                </div>
                
            </NavLink>
            <hr className="sidebar-divider my-0"/>
            <li className="nav-item">
                <NavLink className="nav-link" to="dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>{dashboard}</span>
                </NavLink>
            </li>
            
            <li className="nav-item">
                <NavLink className="nav-link" to="/properties">
                    <i className="fas fa-fw fa-building"></i>
                    <span>{property}</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="users">
                    <i className="fas fa-fw fa-users"></i>
                    <span>{user}</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="roles">
                    <i className="fas fa-fw fa-user-tie"></i>
                    <span>{role}</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="inquiries">
                    <i className="fas fa-fw fa-user-tie"></i>
                    <span>{inquiry}</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="best-seller">
                    <i className="fas fa-fw fa-user-tie"></i>
                    <span>{best_seller}</span>
                </NavLink>
            </li>
        </ul>
    )
}

export default Sidebar
