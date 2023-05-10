import MessageContext from '../../../components/message/context/MessageContext';
import  { useContext, useEffect, useState } from 'react';
import CommonMessage from '../../../helper/message/CommonMessage';
import { useParams } from 'react-router-dom';
import api from '../../../api/Api';
const PropertyDetailsLogic = () => {
  // Base path
  const path = '/properties';
  // End
  const { id } = useParams();//Get id
  const {showMessage} = useContext(MessageContext);//Show message
  // Message
  const {  danger} = CommonMessage;
  // End

  const [loader, setLoader]= useState(false)// lodader
  const [properties, setProperty] = useState()

  // Get property
  useEffect(()=>{
    getProperty(id);
  },[])
  // End
   // Get property api
   const getProperty = async(propertyId) =>{
    setLoader(true);
    try {
        const res = await api.get(`${path}/${propertyId}`)
        const resData = res.data;
        if(resData.status === true){
            setLoader(false);
            setProperty(resData.property)
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
  return {
    path,
    loader,
    properties,
    id
  }
}
export default PropertyDetailsLogic;