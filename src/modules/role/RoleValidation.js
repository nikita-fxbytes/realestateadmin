import CommonMessage from "../../helper/message/CommonMessage";
// Role validation
export const roleValidation =(values)=>{
    const {name_required} =CommonMessage
    const errors = {};
    if (!values.name){
      errors.name = name_required
    }
    return errors;
}
// End