
import MessageContext from "../../../components/message/context/MessageContext";
import CommonMessage from "../../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userValidaions } from "../Validation";
import api from "../../../api/Api";
import { LIMIT, ORDERBY } from "../../../helper/Constent";
import Status from '../../../components/status/Status'
const CreateUserLogic = () => {
  // base url
  const path = '/users';
  const rolePath = '/roles';
  // End
    
  const navigate = useNavigate();//redired url
  const {showMessage} = useContext(MessageContext);//Show message


  //  Message
  const { success, danger} = CommonMessage;
  // End

 
  const [roleLoader, setRoleLoader] = useState(false);//role loader
  const [roles, setRoles] = useState([]); //Roles
  // Get role
  useEffect(()=>{
    getRoles();
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
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
    }finally{
      setRoleLoader(false);
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
    status: LIMIT.ITEMONE
  }
  const [formValues, setFormValues] = useState(intialValues);
  const [errors, setErrors] = useState({});//Error
  const [loader, setLoader] = useState(false);// loader
  // End
  // Input change
  const handleChange = (e) =>{
    let { name, value } = e.target;
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
    const errors = userValidaions(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, email, mobile, password, roleId, status } = formValues;
      const user = {name, email, mobile, password, roleId, status}
      addUser(user);
    }
  }
  // End
  // Add user api
  const addUser = async(formValues) => {
    setLoader(true);
    try {
      const res = await api.post(`${path}/create`, formValues)
      const resData = res.data;
      if(resData.status === true){
        showMessage({
          message: resData.message,
          type: success
        });
        navigate(path);
      }else  if(resData.status === false){
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
      setLoader(false);
      const message = error.response.data.message;
      showMessage({
        message: message,
        type: danger
      });
    }finally{
      setLoader(false);
    }
  }
  // End

  return {
    path,
    roleLoader,
    roles,
    loader,
    errors,
    handleChange,
    handleSubmit,
    formValues,
    Status
  }
}
export default CreateUserLogic;
