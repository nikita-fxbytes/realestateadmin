import createAPI from "../../../api/Api";
import { STATUSCODE } from "../../../helper/Constent";
import { useContext, useEffect, useState } from "react";
import { ProfileValidations } from "./ProfileValidations";
import LogOutLogic from "../../../helper/auth/LogOutLogic";
import AuthContext from "../../../helper/auth/AuthContext";
import CommonMessage from "../../../helper/message/CommonMessage";
import MessageContext from "../../../components/message/context/MessageContext";
const ProfileLogic = () => {
  //Api
  const apiCreator = createAPI();
  const api = apiCreator();
  // End
  const {logOut} = LogOutLogic();//logout
  const { setUserName} = useContext(AuthContext);//Set user name 
  const {showMessage} = useContext(MessageContext);//Show message
  const {success, danger} = CommonMessage;//Message
  const [loader, setLoader] = useState(false);//Loader
  const [formLoader, setFormLoader]= useState(false);//Form Loader
  const intialValues = {
    name: '',
    email: '',
    mobile: ''
  }
  const [formValues, setFormValues] = useState(intialValues);//Form value
  const [errors, setErrors] = useState({});//Error
  useEffect(()=>{
    getProfileDetails();// Get profile
  },[]);
  // Get Profile
  const getProfileDetails = async() =>{
    setLoader(true);
    try {
      const res = await api.get('/profile')
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
  // Form value
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
  // handleSubmit
  const handleSubmit = (e)=>{
    e.preventDefault();
    const errors = ProfileValidations(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, email, mobile } = formValues;
      const user = {name, email, mobile}
      updateProfile(user);
    }
  }
  // End
   // Update user api
   const updateProfile = async(formValues) => {
    setFormLoader(true);
    try {
      const res = await api.put(`/profile`, formValues)
      const resData = res.data;
      if(resData.status === true){
        showMessage({
          message: resData.message,
          type: success
        });
        setUserName(resData.user.name)
      }else if(resData.status === false){
        showMessage({
          message: resData.message,
          type: danger
        });
      }else if(resData.status === STATUSCODE.UNAUTHENTICATED){
        logOut();
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
        setFormLoader(false);
      }
    }
  // End
  return {handleChange, handleSubmit, formValues, loader, errors,  formLoader}
}
export default ProfileLogic;
