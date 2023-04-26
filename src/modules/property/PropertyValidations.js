import CommonMessage from "../../helper/message/CommonMessage";
import PropertyMessage from "./PropertyMessage";
// User validation
export const propertiesValidaions =(values)=>{
  const {name_required, name_more_than_characters} = CommonMessage;
  const {price_required, propertyRealtor_required} = PropertyMessage;
  const errors = {};
  // Name
  if (!values.name){
    errors.name = name_required
  }else if(values.name.length <3){
    errors.name = name_more_than_characters
  }
  // Price
  if(!values.price){
    errors.price= price_required;
  }
  // propertyRealtor
  if(!values.propertyRealtor){
    errors.propertyRealtor = propertyRealtor_required
  }
  return errors;
}
// End
