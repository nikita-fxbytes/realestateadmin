import { useContext, useEffect, useState } from "react";
import CommonMessage from "../../../helper/message/CommonMessage";
import api from "../../../api/Api";
import MessageContext from "../../../components/message/context/MessageContext";

const ProfileLogic = () => {
  const {showMessage} = useContext(MessageContext);//Show message
  //Message
  const {success, danger} = CommonMessage;
  // End
   // Get role
  useEffect(()=>{
    getProfileDetails();
  },[])
  // End
   // Get User
   const [loader, setLoader] = useState(false);//Loader
   const getProfileDetails = async() =>{
    setLoader(true);
    try {
      const res = await api.get('/profile')
      const resData = res.data;
      console.log(resData,":::")
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
      const message = error.response.data.message;
        showMessage({
            message:message,
            type: danger
        });
    }finally{
      setLoader(false)
    }
  }
  // Form value
  const intialValues = {
    name: '',
    email: '',
    mobile: ''
  }
  const [formValues, setFormValues] = useState(intialValues);
  const [errors, setErrors] = useState({});//Error
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
  return { handleChange, formValues,}
}

export default ProfileLogic
