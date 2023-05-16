import MessageContext from '../../../components/message/context/MessageContext';
import Pagination from '../../../components/pagination/Pagination';
import CommonMessage from '../../../helper/message/CommonMessage';
import { useContext, useEffect, useRef, useState } from 'react';
import { LIMIT, ORDERBY } from '../../../helper/Constent';
import api from '../../../api/Api';
const RoleLogic = () => {
  const path = '/roles';//url
  const { delete_role_message, success, danger} = CommonMessage;// Message
  const {showMessage} = useContext(MessageContext);  //show message
  const [loader, setLoader]= useState(false);// lodader
  const [roles, setRoles] = useState([]);//Role

  // filter
  const [sortDirection, setSortDirection] = useState(ORDERBY.DESC);
  const [sortColumn, setSortColumn] = useState(ORDERBY.CREATEDAT);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(LIMIT.ITEMZERO);
  const [perPage, setPerPage] = useState(LIMIT.ITEMTEN);
  const [page, setPage] = useState(LIMIT.ITEMONE);
  // Search
  const seach = (value)=>{
    setSearchTerm(value)
    getRole()
  };
  // End
  // Sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
        // if the same column is clicked again, toggle sort direction
        setSortDirection(sortDirection === ORDERBY.ASC ? ORDERBY.DESC : ORDERBY.ASC);
    } else {
        // if a different column is clicked, set sort column to the new column and sort direction to ascending
        setSortColumn(column);
        setSortDirection(ORDERBY.ASC);
    }
    getRole()
  };
  // End
  // Pagination
  const handlePreviousPage = () => {
    if (page > LIMIT.ITEMONE) {
      setPage(page - LIMIT.ITEMONE);
      getRole();
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + LIMIT.ITEMONE);
      getRole();
    }
  };
  const current = (page) =>{
    setPage(page)
    getRole();
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
        sortDirection: sortDirection,
        page: page, // new pagination params
        perPage: perPage // new pagination params
      };
      const res = await api.post(path, body)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setRoles(resData.roles)
        setTotalPages(resData.totalPages)
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
    seach,
    current,
    handleSort,
    Pagination,
    handleDelete,
    areUSureDelete,
    handleNextPage,
    handlePreviousPage,
    page,
    path,
    roles,
    dialog,
    loader,
    perPage,
    searchTerm,
    totalPages,
    deleteLoader
  }
}
export default RoleLogic;