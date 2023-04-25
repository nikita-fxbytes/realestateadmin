import CommonMessage from "./message/CommonMessage";
import UserMessage from "./message/UserMessage";
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