import CommonMessage from "../../helper/message/CommonMessage";
// Role validation
export const roleValidation =(values)=>{
    const {name_required, status_required} =CommonMessage
    const errors = {};
    if (!values.name){
      errors.name = name_required
    };
    if (!values.status){
      errors.status = status_required
    }
    return errors;
}
// End