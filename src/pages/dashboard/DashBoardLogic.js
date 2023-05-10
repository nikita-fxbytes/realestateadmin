import { useContext, useEffect, useState } from "react"
import MessageContext from "../../components/message/context/MessageContext";
import api from '../../api/Api';
import CommonMessage from '../../helper/message/CommonMessage';
const DashBoardLogic = () => {
    const path = '/counts';//url
    const {showMessage} = useContext(MessageContext);  //show message
    const {danger} = CommonMessage
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
  return{
    allCounts,
    loader
  }
}

export default DashBoardLogic