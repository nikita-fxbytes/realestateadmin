import { useNavigate, useParams } from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import MessageContext from '../../../components/message/context/MessageContext'
import api from '../../../api/Api';
import { roleValidation } from "../RoleValidation";
const RoleEditLogic = () => {
  const path = '/roles';//Base url
  const { id } = useParams();//Get id
  const navigate = useNavigate();  //redirect another page
  const { danger, success} = CommonMessage;//Message
  const {showMessage} = useContext(MessageContext);  //show message
  const [loader, setLoader]= useState(false)// loder
  //Get role 
  useEffect(()=>{
    getRole(id)
  },[]);
  // End
  // Get role
  const getRole = async(roleId) =>{
    setLoader(true);
    try {
      const res = await api.get(`${path}/${roleId}`)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setFormValue(resData.role)
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
    name: ''
  }
  const [formValues, setFormValue] = useState(intialValues)
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
      editRole(role);
    }
  }
  // End
  // Edit Role api
  const editRole = async(formValues) =>{
    setLoader(true);
    try {
      const res = await api.put(`${path}/${id}`, formValues)
      const resData = res.data;
      console.log(resData.message)
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
    handleSubmit,
    handleChange,
    errors,
    formValues,
    loader,
    path,
    id

  }
}
export default RoleEditLogic;

