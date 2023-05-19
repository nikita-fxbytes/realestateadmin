import MessageContext from '../../../components/message/context/MessageContext';
import { useContext, useEffect, useRef, useState } from 'react';
import CommonMessage from '../../../helper/message/CommonMessage';
import UserMessage from '../UserMessage';
import createAPI from '../../../api/Api';
import { LIMIT, ORDERBY, STATUSCODE } from '../../../helper/Constent';
import Pagination from '../../../components/pagination/Pagination';
import Status from '../../../components/status/Status';
import LogOutLogic from '../../../helper/auth/LogOutLogic';
const UsersListLogic = () => {
  const {logOut} = LogOutLogic()
  const apiCreator = createAPI();
  const api = apiCreator(); 
  const path = '/users';//Base url
  // Message 
  const { danger, success} = CommonMessage;
  const {delete_user_message} = UserMessage;
  // End
  const {showMessage} = useContext(MessageContext);  //show message

  const [loader, setLoader]= useState(false)// lodader
  const [allUsers, setAllUsers] = useState([]);//Get user
   // filter
   const [sortDirection, setSortDirection] = useState(ORDERBY.DESC);
   const [sortColumn, setSortColumn] = useState(ORDERBY.CREATEDAT);
   const [searchTerm, setSearchTerm] = useState("");
   const [totalPages, setTotalPages] = useState(LIMIT.ITEMZERO);
   const [perPage, setPerPage] = useState(LIMIT.ITEMTEN);
   const [page, setPage] = useState(LIMIT.ITEMONE);
   const [onlyActive, setOnlyActive] = useState("");
   const [status, setStatus]= useState("");
   // Search
   const seach = (e)=>{
      setSearchTerm(e.target.value)
      getUsers()
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
     getUsers()
   };
   // End
   // Pagination
   const handlePreviousPage = () => {
     if (page > LIMIT.ITEMONE) {
       setPage(page - LIMIT.ITEMONE);
       getUsers();
     }
   };
   const handleNextPage = () => {
     if (page < totalPages) {
       setPage(page + LIMIT.ITEMONE);
       getUsers();
     }
   };
   const current = (page) =>{
     setPage(page)
     getUsers();
   };
   const statusSearch = (e)=>{
     setStatus(e.target.value)
     getUsers()
   }
   // End
  // Get user
  useEffect(()=>{
    getUsers();
  },[sortColumn, sortDirection, status, searchTerm])
  // End
   // Get user api
   const getUsers = async() =>{
    try {
      setLoader(true);
      const body = {
        searchTerm: searchTerm,
        sortColumn: sortColumn, 
        sortDirection: sortDirection, 
        page: page,
        perPage: perPage,
        roleName: "",
        onlyActive: onlyActive,
        status: status
      };
      const res = await api.post(path, body)
      const resData = res.data;
      if(resData.status === true){
        setAllUsers(resData.users);
        setTotalPages(resData.totalPages)
      }else if(resData.status === false){
        showMessage({
          message:resData.message,
          type: danger
        });
      }else{
        showMessage({
          message:resData.message,
          type: danger
        });
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
    handleDelete, areUSureDelete, Pagination, seach, current, handleSort, handleNextPage, handlePreviousPage, statusSearch, Status,
    deleteLoader, dialog, loader, allUsers, path, page, perPage, searchTerm, totalPages,
  }
}
export default UsersListLogic;
