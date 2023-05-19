import { useNavigate, useParams } from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import MessageContext from '../../../components/message/context/MessageContext'
import createAPI from '../../../api/Api';
import { roleValidation } from "../RoleValidation";
import Status from '../../../components/status/Status'
import LogOutLogic from "../../../helper/auth/LogOutLogic";
import { STATUSCODE } from "../../../helper/Constent";
const RoleEditLogic = () => {
  const {logOut} = LogOutLogic()
  const apiCreator = createAPI();
  const api = apiCreator();
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
      
        setFormValue(resData.role)
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
    status:''
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
      const {name, status} = formValues;
      const role = { name, status };
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
      if(resData.status === true){
        showMessage({
            message:resData.message,
            type: success
          });
          navigate(path);
      }else if (resData.status === false){
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
      setLoader(false)
    }
  }
  // End
  return {
    handleSubmit,
    handleChange,
    Status,
    errors,
    formValues,
    loader,
    path,
    id

  }
}
export default RoleEditLogic;

