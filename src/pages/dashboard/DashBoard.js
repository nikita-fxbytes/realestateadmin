import { Link } from "react-router-dom"
import PageHeading from "../../components/pageheading/PageHeading"
import { useContext, useEffect, useState } from "react"
import MessageContext from "../../components/message/context/MessageContext";
import api from '../../api/Api';
import CommonMessage from '../../helper/message/CommonMessage';
const DashBoard = () => {
    const path = '/counts';//url
    const {showMessage} = useContext(MessageContext);  //show message
    const {danger, users, properties} = CommonMessage
    // DashBoard Count
    const intialCount = {
        propertiesCount: 0,
        usersCount: 0
    }
    const [allCounts, setAllCount] = useState(intialCount);//Get dashboard count
    const [loader, setLoader] = useState(false);//Loader
    useEffect(()=>{
        getCount();
    }, [])
    // Get count
    const getCount = async() =>{
        setLoader(true);
        try {
          const res = await api.get(path)
          const resData = res.data;
          if(resData.status === true){
            setLoader(false);
            setAllCount(resData.allCount);
          }
        } catch (error) {
          setLoader(false)
          const message = error.response.data.message;
            showMessage({
                message: message,
                type: danger
            });
        }
    }

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
