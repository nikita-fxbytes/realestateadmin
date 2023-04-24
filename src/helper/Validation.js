import CommonMessage from "./message/CommonMessage";
// ROle validation
export const roleValidation =(values)=>{
    const {name_required} =CommonMessage
    const errors = {};
    if (!values.name){
      errors.name = name_required
    }
    return errors;
}
// End

// ROle validation
export const userValidaions =(values)=>{
  const {name_required} =CommonMessage
  const errors = {};
  const regex = /^[^\\$@]+@[^\\$@]+\\.[^\\$@]{2,}$/i;
  // Name
  if (!values.name){
    errors.name = name_required
  }
  // email
  if(!values.email){
    errors.email= "Email is required!";
  }else if(!regex.test(values.email)){
      errors.email = "This is not a valid email format!";
  }
  // Mobile
  if(!values.mobile){
    errors.mobile= "Mobile is required!";
  } else if(values.mobile.length <10){
      errors.mobile = "Mobile must be more than 10 characters";
  } else if(values.mobile.length >15){
    errors.mobile = "Mobile cannot be more than 15 characters";
} 
  // Password
  if(!values.password){
    errors.password= "Password is required!";
  } else if(values.password.length<6){
      errors.password = "Password must be more than 4 characters";
  } else if(values.password.length>16){
      errors.password = "Password cannot be more than 16 characters";
  }
  //Role
  if (!values.roleId){
    errors.roleId = name_required
  }
  return errors;
}
// End