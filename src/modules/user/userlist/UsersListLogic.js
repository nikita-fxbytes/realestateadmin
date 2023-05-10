import MessageContext from '../../../components/message/context/MessageContext';
import { useContext, useEffect, useRef, useState } from 'react';
import CommonMessage from '../../../helper/message/CommonMessage';
import UserMessage from '../UserMessage';
import api from '../../../api/Api';
const UsersListLogic = () => {
  const path = '/users';//Base url
  // Message 
  const { danger, success} = CommonMessage;
  const {delete_user_message} = UserMessage;
  // End
  const {showMessage} = useContext(MessageContext);  //show message

  const [loader, setLoader]= useState(false)// lodader
  const [allUsers, setAllUsers] = useState([]);//Get user
  // Get user
  useEffect(()=>{
    getUsers();
  },[])
  // End
   // Get user api
   const getUsers = async() =>{
    setLoader(true);
    try {
      const res = await api.get(path)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setAllUsers(resData.users)
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

  // Delete user
  // Dialog box
  const [dialog, setDiaLog] = useState({
    message:'',
    isLoading: false
  });
  const [deleteLoader, setDeleteLoader] = useState(false)
  // end
  const idUserRef = useRef();
  const handleDiaLog = (message, isLoading)=>{
    setDiaLog({
      message:message,
      isLoading:isLoading
    })
  }
  
  const handleDelete = (id) =>{
    handleDiaLog(delete_user_message, true)
    idUserRef.current = id;
  }
  const areUSureDelete = async (choose) =>{
    if(choose){
      setDeleteLoader(true);
      try {
        const res = await api.delete(`${path}/${idUserRef.current}`);
        const resData = res.data;
        if(resData.status === true){
          const newUsers = allUsers.filter((user)=>user._id !==idUserRef.current)
          setAllUsers(newUsers);
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
    handleDelete,
    areUSureDelete,
    deleteLoader,
    dialog,
    loader,
    allUsers,
    path
  }
}
export default UsersListLogic;
