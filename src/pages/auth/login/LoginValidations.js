import CommonMessage from "../../../helper/message/CommonMessage";
export const LoginValidations =(values)=>{
  const { email_required, email_format, password_required} =CommonMessage;
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  // Email
  if(!values.email){
    errors.email= email_required;
  }else if(!regex.test(values.email)){
    errors.email = email_format;
  }
  // Password
  if(!values.password){
    errors.password= password_required;
  } 
  return errors;
}
// End
