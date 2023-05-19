import { NavLink } from "react-router-dom"
const Sidebar = () => {
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
                    <span>Dashboard</span>
                </NavLink>
            </li>
            
            <li className="nav-item">
                <NavLink className="nav-link" to="/properties">
                    <i className="fas fa-fw fa-building"></i>
                    <span>Property</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="users">
                    <i className="fas fa-fw fa-users"></i>
                    <span>User</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="roles">
                    <i className="fas fa-fw fa-user-tie"></i>
                    <span>Role</span>
                </NavLink>
            </li>
        </ul>
    )
}

export default Sidebar
