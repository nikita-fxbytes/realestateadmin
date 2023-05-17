import { useState } from "react";
import CommonMessage from "../../../helper/message/CommonMessage";
import api from "../../../api/Api";

const ProfileLogic = () => {
  //Message
  const {success, danger} = CommonMessage;
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
    // const errors = editUserValidaions(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, email, mobile, password, roleId, status } = formValues;
      const user = {name, email, mobile, password, roleId, status}
      updateUser(user);
    }
  }
  // End
  const updateUser = async(formValues) => {
    // setLoader(true);
    // try {
    //   const res = await api.put(`${path}/${id}`, formValues)
    //   const resData = res.data;
    //   if(resData.status === true){
    //     showMessage({
    //       message: resData.message,
    //       type: success
    //     });
    //     navigate(path);
    //   }else if(resData.status === false){
    //     showMessage({
    //       message: resData.message,
    //       type: danger
    //     });
    //   }else{
    //     showMessage({
    //       message: resData.message,
    //       type: danger
    //     });
    //   }
    // } catch (error) {
    //   const message = error.response.data.message;
    //   showMessage({
    //     message: message,
    //     type: danger
    //   });
    // }finally{
    //   // setLoader(false);
    // }
  }
  return {handleSubmit, handleChange,  formValues, errors,}
}

export default ProfileLogic
