import {useNavigate } from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import { useContext, useState } from "react";
import MessageContext from '../../../components/message/context/MessageContext'
import createAPI from '../../../api/Api';
import { roleValidation } from "../RoleValidation";
import Status from '../../../components/status/Status'
import { LIMIT, STATUSCODE } from "../../../helper/Constent";
import LogOutLogic from "../../../helper/auth/LogOutLogic";
const RoleCreateLogic = () => {
  const {logOut} = LogOutLogic()
const apiCreator = createAPI();
const api = apiCreator(); 
  const path = '/roles';
  const navigate = useNavigate();  //redirect another page
  const {success, danger} = CommonMessage;
  const {showMessage} = useContext(MessageContext);  //show message
  const [loader, setLoader]= useState(false)// lodader

  // Form value
  const intialValues = {
    name: '',
    status: LIMIT.ITEMONE
  }
  const [formValues, setFormValue] = useState(intialValues);
  // End
  const [errors, setErrors] = useState({});// Error

  // input change value
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormValue({...formValues, [name]: value});
    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors, [name]: '' });
    }
  }
  // End
  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = roleValidation(formValues)
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const {name, status} = formValues;
      const role = { name, status };
      addRole(role);
    }
  }
  // End
  // Add role api
  const addRole = async(formValues) =>{
    setLoader(true);
    try {
      const res = await api.post(`${path}/create`, formValues)
      const resData = res.data;
      if(resData.status === true){
       
        showMessage({
            message:resData.message,
            type: success
          });
          navigate(path);
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
  return {
    handleSubmit,
    handleChange,
    Status,
    errors,
    loader,
    path,
    formValues
    
  }
}

export default RoleCreateLogic;