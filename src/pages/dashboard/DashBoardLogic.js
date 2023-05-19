import createAPI from '../../api/Api';
import {STATUSCODE} from '../../helper/Constent';
import LogOutLogic  from "../../helper/auth/LogOutLogic";
import {useContext, useEffect, useState} from "react";
import CommonMessage from '../../helper/message/CommonMessage';
import MessageContext from "../../components/message/context/MessageContext";
const DashBoardLogic = () => {
  // Api
  const apiCreator = createAPI();
  const api = apiCreator();
  // End
  const {logOut} = LogOutLogic()
  const path = '/counts';//url
  const {showMessage} = useContext(MessageContext);  //show message
  const {danger} = CommonMessage;//Message
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
        
        setAllCount(resData.allCount);
      }
    } catch (error) {
      const errorResponse = error.response.data;
      if(errorResponse.status=== STATUSCODE.UNAUTHENTICATED){
          logOut();
      }
      const message = errorResponse.message;
      showMessage({
          message:message,
          type: danger
      });
    }finally{
      setLoader(false);
    }
  }

  // End
  return{allCounts, loader}
}
export default DashBoardLogic;