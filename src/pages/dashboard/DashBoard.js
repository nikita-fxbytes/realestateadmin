import { Link } from "react-router-dom"
import PageHeading from "../../components/pageheading/PageHeading"
import CommonMessage from '../../helper/message/CommonMessage';
import DashBoardLogic from "./DashBoardLogic";
const DashBoard = () => {
    const { users, properties} = CommonMessage; //Message
    const {allCounts, loader} = DashBoardLogic();
    // End
  return (
    <div>
        <PageHeading heading='Dashboard'/>
        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
                <Link to={'/users'}>
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        {users}</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{allCounts && allCounts.usersCount ? allCounts.usersCount : 0}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-users fa-2x text-primary"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <Link to={'/properties'}>
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        {properties}</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{allCounts && allCounts.propertiesCount ? allCounts.propertiesCount : 0}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-building fa-2x text-success"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default DashBoard
