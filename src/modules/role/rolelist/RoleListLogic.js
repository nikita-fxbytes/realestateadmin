import MessageContext from '../../../components/message/context/MessageContext';
import { useContext, useEffect, useRef, useState } from 'react';
import CommonMessage from '../../../helper/message/CommonMessage';
import api from '../../../api/Api';

const RoleLogic = () => {
  const path = '/roles';//url
  const { delete_role_message, success, danger} = CommonMessage;// Message
  const {showMessage} = useContext(MessageContext);  //show message
  const [loader, setLoader]= useState(false)// lodader
  const [roles, setRoles] = useState([]);//Role
  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const seach = (value)=>{
    setSearchTerm(value)
    getRole()
  }
  // End
  // Sorting
  const [sortDirection, setSortDirection] = useState('desc');
  const [sortColumn, setSortColumn] = useState('createdAt');
  const handleSort = (column) => {
    if (sortColumn === column) {
        // if the same column is clicked again, toggle sort direction
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        console.log(sortDirection)
    } else {
        // if a different column is clicked, set sort column to the new column and sort direction to ascending
        setSortColumn(column);
        setSortDirection('asc');
    }
    getRole()
};
  // End
  
  // Get roles
  useEffect(()=>{
    getRole();
  },[sortColumn, sortDirection])
   // Get Role api
   const getRole = async() =>{
    setLoader(true);
    try {
      const body = {
        searchTerm: searchTerm,
        sortColumn: sortColumn,
        sortDirection: sortDirection
      };
      const res = await api.post(path, body)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setRoles(resData.roles)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
    }
  }
  // End

  // Delete role
  // Dialog box
  const [dialog, setDiaLog] = useState({
    message:'',
    isLoading: false
  });
  const [deleteLoader, setDeleteLoader] = useState(false)
  // end
  const idRoleRef = useRef();
  const handleDiaLog = (message, isLoading)=>{
    setDiaLog({
      message:message,
      isLoading:isLoading
    })
  }
  
  const handleDelete = (id) =>{
    handleDiaLog(delete_role_message, true)
    idRoleRef.current = id;
  }
  const areUSureDelete = async (choose) =>{
    if(choose){
      setDeleteLoader(true);
      try {
        const res = await api.delete(`${path}/${idRoleRef.current}`);
        const resData = res.data;
        if(resData.status === true){
          const newRole = roles.filter((role)=>role._id !==idRoleRef.current)
          setRoles(newRole);
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
    areUSureDelete,
    handleDelete,
    deleteLoader,
    dialog,
    loader,
    roles,
    path,
    searchTerm,
    seach,
    handleSort
  }
}
export default RoleLogic;