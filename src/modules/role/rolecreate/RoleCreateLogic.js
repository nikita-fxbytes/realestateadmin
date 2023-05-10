import {useNavigate } from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import { useContext, useState } from "react";
import MessageContext from '../../../components/message/context/MessageContext'
import api from '../../../api/Api';
import { roleValidation } from "../RoleValidation";
const RoleCreateLogic = () => {
  const path = '/roles';
  const navigate = useNavigate();  //redirect another page
  const {success, danger} = CommonMessage;

  const {showMessage} = useContext(MessageContext);  //show message

  const [loader, setLoader]= useState(false)// lodader

  // Form value
  const intialValues = {
    name: ''
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
      const {name} = formValues;
      const role = { name };
      addRole(role);
    }
  }
  // End
  // Add role api
  const addRole = async(formValues) =>{
    setLoader(true);
    try {
      const res = await api.post(path, formValues)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false)
        showMessage({
            message:resData.message,
            type: success
          });
          navigate(path);
      }
    } catch (error) {
      setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message:message,
            type: danger
        });
    }
  }
  // End
  return {
    path,
    handleSubmit,
    handleChange,
    errors,
    loader
  }
}

export default RoleCreateLogic;