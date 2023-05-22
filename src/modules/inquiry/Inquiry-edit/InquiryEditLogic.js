import { useNavigate, useParams } from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import MessageContext from "../../../components/message/context/MessageContext";
import createAPI from '../../../api/Api'
import Status from "../../../components/status/Status";
import { LIMIT, ORDERBY, STATUSCODE } from "../../../helper/Constent";
import LogOutLogic from '../../../helper/auth/LogOutLogic'
import { inquiryValidaions } from "../InquiryValidations";
const InquiryEditLogic = () => {
  const {logOut} = LogOutLogic();
  const apiCreator = createAPI();
  const api = apiCreator(); 
  // Base path
  const path = '/inquiries';
  // End

  // Redirect url
  const navigate = useNavigate();
  // End
  
  const { id } = useParams();//Get id

  const {showMessage} = useContext(MessageContext);//Show message

  // Message
  const {danger, success} = CommonMessage;
  // End

  const [propertyLoader, setPropertyLoader] = useState(false);//Loader
  const [properties, setProperties] = useState([]); //User loader

  // Get role
  useEffect(()=>{
    getProperty();
    getInquiry(id);
    
  },[])
  // End

  // Get user api
  const getProperty = async() =>{
    setPropertyLoader(true);
    try {
      const body = {
        searchTerm: '',
        sortColumn: ORDERBY.CREATEDAT, 
        sortDirection: ORDERBY.DESC, 
        page: '',
        perPage: '',
        onlyActive: LIMIT.ITEMONE,
        status: ''
      };
      const res = await api.post('/properties', body)
      const resData = res.data;
      if(resData.status === true){
        setProperties(resData.properties)
      }else if(resData.status === false){
        showMessage({
          message: resData.message,
          type: danger
        });
      }else {
        showMessage({
          message: resData.message,
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
      setPropertyLoader(false)
    }
  }
  // End

   // Get property
   const [loader, setLoader] = useState(false);//Loader
   const getInquiry = async(inquiryId) =>{
    setLoader(true);
    try {
      const res = await api.get(`${path}/${inquiryId}`)
      const resData = res.data;
      if(resData.status === true){
        setFormValues(resData.inquiry)
      }else if(resData.status === true){
        showMessage({
          message:resData.message,
          type: danger
        });
      }else {
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

  // Form value
  const intialValues = {
    name: '',
    email: '',
    mobile: '',
    message: '',
    property: ''
  }
  const [formValues, setFormValues] = useState(intialValues);
  const [errors, setErrors] = useState({});//Error
  // End
  // Input change
  const handleChange = (e) =>{
    let {name, value} = e.target;
    if (name === 'mobile') {
      // restrict input to only numbers for the 'mobile' field
      const regex = /[^0-9]/g; // match anything that's not a digit
      value = value.replace(regex, ''); // update the value variable with the filtered value
    }
    setFormValues({...formValues, [name]: value});
    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors, [name]: '' });
    }
  }
  // End
  // Submit Form
  const handleUpdate = (e) =>{
    e.preventDefault();
    const errors = inquiryValidaions(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, email, mobile, message, property} = formValues;
      const inquiry = {name, email, mobile, message, property}
      updateInquiry(inquiry);
    }
  }
  // End
  // Update property api
  const updateInquiry = async(formValues) => {
    setLoader(true);
    try {
      const res = await api.put(`${path}/${id}`, formValues)
      const resData = res.data;
      if(resData.status === true){
        showMessage({
          message: resData.message,
          type: success
        });
        navigate(path);
      }else if(resData.status === false){
        showMessage({
          message: resData.message,
          type: danger
        });
      }else {
        showMessage({
          message: resData.message,
          type: danger
        });
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
  return {
    propertyLoader,
    properties,
    loader,
    errors,
    handleChange,
    handleUpdate,
    formValues,
    path,
    Status
  }
}

export default InquiryEditLogic;

