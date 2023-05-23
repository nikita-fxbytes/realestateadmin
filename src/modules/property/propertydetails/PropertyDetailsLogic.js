import MessageContext from '../../../components/message/context/MessageContext';
import  { useContext, useEffect, useState } from 'react';
import CommonMessage from '../../../helper/message/CommonMessage';
import { useParams } from 'react-router-dom';
import createAPI from '../../../api/Api';
const PropertyDetailsLogic = () => {
  const apiCreator = createAPI();
  const api = apiCreator(); 
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
            setProperty(resData.property)
        }else if(resData.status === false){
          showMessage({
            message: resData.message,
            type: danger
          });
        }else{
          showMessage({
            message: resData.message,
            type: danger
          });
        }
    } catch (error) {
      console.log(error)
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
    }finally{
      setLoader(false);
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