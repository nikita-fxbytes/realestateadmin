import MessageContext from '../../../components/message/context/MessageContext';
import  { useContext, useEffect, useRef, useState } from 'react';
import CommonMessage from '../../../helper/message/CommonMessage';
import createAPI from '../../../api/Api';
import Status from '../../../components/status/Status';
import { LIMIT, ORDERBY, STATUSCODE, STATUSREAD } from '../../../helper/Constent';
import LogOutLogic from '../../../helper/auth/LogOutLogic';
import InquiryMessages from '../InquiryMessages';
const InquiryListLogic = () => {
  const {logOut} = LogOutLogic();
  const apiCreator = createAPI();
  const api = apiCreator(); 
   // Base path
   const path = '/inquiries';
   // End
   const {showMessage} = useContext(MessageContext);//Show message
   // Message
   const {success, danger} = CommonMessage;
   const {delete_inquiry_message} = InquiryMessages;
   // End
 
   const [loader, setLoader]= useState(false)// lodader
   const [allInquiries, setAllInquiries] = useState([])
 // filter
 const [sortDirection, setSortDirection] = useState(ORDERBY.DESC);
 const [sortColumn, setSortColumn] = useState(ORDERBY.CREATEDAT);
 const [searchTerm, setSearchTerm] = useState("");
 const [totalPages, setTotalPages] = useState(LIMIT.ITEMZERO);
 const [perPage, setPerPage] = useState(LIMIT.ITEMTEN);
 const [page, setPage] = useState(LIMIT.ITEMONE);
 const [currentStatus, setCurrentStatus]= useState("");
  const [getStatus, setgetStatus] = useState(STATUSREAD);
 // Search
 const seach = (e)=>{
    setSearchTerm(e.target.value)
    getInquiries()
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
   getInquiries()
 };
 // End
 // Pagination
 const handlePreviousPage = () => {
   if (page > LIMIT.ITEMONE) {
     setPage(page - LIMIT.ITEMONE);
     getInquiries();
   }
 };
 const handleNextPage = () => {
   if (page < totalPages) {
     setPage(page + LIMIT.ITEMONE);
     getInquiries();
   }
 };
 const current = (page) =>{
   setPage(page)
   getInquiries();
 };
 const statusSearch = (e)=>{
  setCurrentStatus(e.target.value)
   getInquiries()
 }
 // End
   // Get inquiry
   useEffect(()=>{
     getInquiries();
   },[sortColumn, sortDirection, currentStatus, searchTerm])
   // End
    // Get inquiry api
    const getInquiries = async() =>{
     setLoader(true);
     try {
      const body = {
        searchTerm: searchTerm,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        page: page, // new pagination params
        perPage: perPage, // new pagination params,
        onlyActive: '',
        status: currentStatus
      };
       const res = await api.post(path, body)
       const resData = res.data;
       if(resData.status === true){
         setAllInquiries(resData.inquiries)
         setTotalPages(resData.totalPages)
       }
     }catch (error) {
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
 
   // Delete inquiry
   // Dialog box
   const [dialog, setDiaLog] = useState({
     message:'',
     isLoading: false
   });
   const [deleteLoader, setDeleteLoader] = useState(false)
   // end
   const idInquiryRef = useRef();
   const handleDiaLog = (message, isLoading)=>{
     setDiaLog({
       message:message,
       isLoading:isLoading
     })
   }
   
   const handleDelete = (id) =>{
     handleDiaLog(delete_inquiry_message, true)
     idInquiryRef.current = id;
   }
   const areUSureDelete = async (choose) =>{
     if(choose){
       setDeleteLoader(true);
       try {
         const res = await api.delete(`${path}/${idInquiryRef.current}`);
         const resData = res.data;
         if(resData.status === true){
           const newInquiry = allInquiries.filter((inquiry)=>inquiry._id !==idInquiryRef.current)
           setAllInquiries(newInquiry);
           showMessage({
             message:resData.message,
             type:success
           });
          
         }
       
       } catch (error) {
         const message = error.response.data.message;
         showMessage({
             message:message,
             type:danger
         });
       }finally{
        setDeleteLoader(false);
       }
       handleDiaLog("", false)
     }else{
       handleDiaLog("", false)
     }
   }
   // end
  //  handleMarkAsRead
  const handleMarkAsRead = async (id) =>{
    setDeleteLoader(true);
    try {
      const res = await api.put(`${path}/${id}/mark-as-read`);
      const resData = res.data;
      if(resData.status === true){
        getInquiries();
        showMessage({
          message:resData.message,
          type:success
        });

      }else if(resData.status === false){
        showMessage({
          message:resData.message,
          type:danger
        });
      }else{
        showMessage({
          message:resData.message,
          type:danger
        });
      }
    
    } catch (error) {
      const message = error.response.data.message;
      showMessage({
          message:message,
          type:danger
      });
    }finally{
      setDeleteLoader(false);
    }
  }
  // End

  return {
    handleDelete, seach, current, handleSort ,handleNextPage, handlePreviousPage, statusSearch, Status,areUSureDelete, handleMarkAsRead,
    loader, allInquiries, deleteLoader, path, dialog ,page, perPage, searchTerm, totalPages, getStatus, 
  };
};

export default InquiryListLogic;