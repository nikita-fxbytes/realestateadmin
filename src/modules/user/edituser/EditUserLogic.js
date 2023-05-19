import MessageContext from "../../../components/message/context/MessageContext";
import {useNavigate, useParams } from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import { editUserValidaions } from "../Validation";
import createAPI from "../../../api/Api";
import { LIMIT, ORDERBY, STATUSCODE } from "../../../helper/Constent";
import Status from '../../../components/status/Status'
import LogOutLogic from "../../../helper/auth/LogOutLogic";
const EditUserLogic = () => {
  const {logOut} = LogOutLogic()
const apiCreator = createAPI();
const api = apiCreator(); 
  // Base url
  const path = '/users';
  const rolePath = '/roles';
  // End
  const { id } = useParams();//Get id
  const navigate = useNavigate();//redirect api
  const {showMessage} = useContext(MessageContext);//Show message

  //Message
  const {success, danger} = CommonMessage;
  // End
  const [roleLoader, setRoleLoader] = useState(false);// Role loader
  const [roles, setRoles] = useState([]); //Roles 
  // Get role
  useEffect(()=>{
    getRoles();
    getUser(id);
  },[])
  // End
  // Get role Api
  const getRoles = async() =>{
    setRoleLoader(true);
    try {
      const body = {
        searchTerm: "",
        sortColumn: ORDERBY.CREATEDAT,
        sortDirection: ORDERBY.DESC,
        page: "", // new pagination params
        perPage: "", // new pagination params,
        onlyActive: LIMIT.ITEMONE,
        status: ""
      };
      const res = await api.post(rolePath, body)
      const resData = res.data;
      if(resData.status === true){
        setRoles(resData.roles)
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
      setRoleLoader(false);
    }
  }
  // End
   // Get User
   const [loader, setLoader] = useState(false);//Loader
   const getUser = async(userId) =>{
    setLoader(true);
    try {
      const res = await api.get(`${path}/${userId}`)
      const resData = res.data;
      if(resData.status === true){
        setFormValues(resData.user)
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
      setLoader(false)
    }
  }
  // End
  // Form value
  const intialValues = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    roleId: '',
    status: ''
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
  const handleSubmit = (e) =>{
    e.preventDefault();
    const errors = editUserValidaions(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, email, mobile, password, roleId, status } = formValues;
      const user = {name, email, mobile, password, roleId, status}
      updateUser(user);
    }
  }
  // End
  // Update user api
  const updateUser = async(formValues) => {
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
      }else{
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
    handleSubmit,
    handleChange,
    Status,
    loader,
    formValues,
    errors,
    roleLoader,
    roles,
    id
  }
}

export default EditUserLogic;
