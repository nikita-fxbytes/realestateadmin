import MessageContext from '../../../components/message/context/MessageContext';
import  { useContext, useEffect, useRef, useState } from 'react';
import PropertyMessage from '../PropertyMessage';
import CommonMessage from '../../../helper/message/CommonMessage';
import api from '../../../api/Api';

const PropertyLogic = () => {
   // Base path
   const path = '/properties';
   // End
 
   const {showMessage} = useContext(MessageContext);//Show message
 
   // Message
   const {success, danger} = CommonMessage;
   const {delete_property_message} = PropertyMessage;
   // End
 
   const [loader, setLoader]= useState(false)// lodader
   const [allProperties, setAllProperties] = useState([])
 
   // Get property
   useEffect(()=>{
     getProperties();
   },[])
   // End
    // Get property api
    const getProperties = async() =>{
     setLoader(true);
     try {
       const res = await api.get(path)
       const resData = res.data;
       if(resData.status === true){
         setLoader(false);
         setAllProperties(resData.properties)
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
 
   // Delete property
   // Dialog box
   const [dialog, setDiaLog] = useState({
     message:'',
     isLoading: false
   });
   const [deleteLoader, setDeleteLoader] = useState(false)
   // end
   const idPropertyRef = useRef();
   const handleDiaLog = (message, isLoading)=>{
     setDiaLog({
       message:message,
       isLoading:isLoading
     })
   }
   
   const handleDelete = (id) =>{
     handleDiaLog(delete_property_message, true)
     idPropertyRef.current = id;
   }
   const areUSureDelete = async (choose) =>{
     if(choose){
       setDeleteLoader(true);
       try {
         const res = await api.delete(`${path}/${idPropertyRef.current}`);
         const resData = res.data;
         if(resData.status === true){
           const newProperties = allProperties.filter((property)=>property._id !==idPropertyRef.current)
           setAllProperties(newProperties);
           showMessage({
             message:resData.message,
             type:success
           });
           setDeleteLoader(false);
         }
       
       } catch (error) {
         const message = error.response.data.message;
         showMessage({
             message:message,
             type:danger
         });
         setDeleteLoader(false);
       }
       handleDiaLog("", false)
     }else{
       handleDiaLog("", false)
     }
   }
   // end

  return {
    loader,
    allProperties,
    handleDelete,
    deleteLoader,
    areUSureDelete,
    path,
    dialog
  };
};

export default PropertyLogic;