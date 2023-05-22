import MessageContext from '../../components/message/context/MessageContext';
import  { useContext, useEffect, useState } from 'react';
import CommonMessage from '../../helper/message/CommonMessage';
import createAPI from '../../api/Api';
import { LIMIT, ORDERBY, STATUSCODE } from '../../helper/Constent';
import LogOutLogic from '../../helper/auth/LogOutLogic';
const BestSellerLogic = () => {
  const {logOut} = LogOutLogic();
  const apiCreator = createAPI();
  const api = apiCreator(); 
   const {showMessage} = useContext(MessageContext);//Show message
   // Message
   const { danger} = CommonMessage;
   // End
 
   const [loader, setLoader]= useState(false)// lodader
   const [allRetator, setAllRetator] = useState([])
 // filter
 const [sortDirection, setSortDirection] = useState(ORDERBY.DESC);
 const [sortColumn, setSortColumn] = useState(ORDERBY.CREATEDAT);
 const [searchTerm, setSearchTerm] = useState("");
 const [totalPages, setTotalPages] = useState(LIMIT.ITEMZERO);
 const [perPage, setPerPage] = useState(LIMIT.ITEMTEN);
 const [page, setPage] = useState(LIMIT.ITEMONE);
 // Search
 const seach = (e)=>{
    setSearchTerm(e.target.value)
    getRetator()
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
   getRetator()
 };
 // End
 // Pagination
 const handlePreviousPage = () => {
   if (page > LIMIT.ITEMONE) {
     setPage(page - LIMIT.ITEMONE);
     getRetator();
   }
 };
 const handleNextPage = () => {
   if (page < totalPages) {
     setPage(page + LIMIT.ITEMONE);
     getRetator();
   }
 };
 const current = (page) =>{
   setPage(page)
   getRetator();
 };
 
 // End
   // Get inquiry
   useEffect(()=>{
     getRetator();
   },[sortColumn, sortDirection, searchTerm])
   // End
    // Get inquiry api
    const getRetator = async() =>{
     setLoader(true);
     try {
      const body = {
        searchTerm: searchTerm,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        page: page, // new pagination params
        perPage: perPage, // new pagination params,
      };
       const res = await api.post('/retator', body)
       const resData = res.data;
       if(resData.status === true){
        setAllRetator(resData.realtors)
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
  return {
    seach, current, handleSort ,handleNextPage, handlePreviousPage, 
    loader, allRetator ,page, perPage, searchTerm, totalPages, 
  };
};

export default BestSellerLogic;