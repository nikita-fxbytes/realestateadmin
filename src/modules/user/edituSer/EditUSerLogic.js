import MessageContext from "../../../components/message/context/MessageContext";
import {useNavigate, useParams } from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import { editUserValidaions } from "../Validation";
import api from "../../../api/Api";

const EditUSerLogic = () => {
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
      const res = await api.get(rolePath)
      const resData = res.data;
      if(resData.status === true){
        setRoleLoader(false);
        setRoles(resData.roles)
      }
    } catch (error) {
      setRoleLoader(false)
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
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
        setLoader(false);
        setFormValues(resData.user)
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
  // Form value
  const intialValues = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    roleId: ''
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
      const {name, email, mobile, password, roleId } = formValues;
      const user = {name, email, mobile, password, roleId}
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
        setLoader(false);
        showMessage({
          message: resData.message,
          type: success
        });
        navigate(path);
      }
      
    } catch (error) {
      const message = error.response.data.message;
      showMessage({
        message: message,
        type: danger
      });
    }
  }
  // End

  return {
    handleSubmit,
    handleChange,
    loader,
    formValues,
    errors,
    roleLoader,
    roles,
    id
  }
}

export default EditUSerLogic;
