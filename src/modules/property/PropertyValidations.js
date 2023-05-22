import CommonMessage from "../../helper/message/CommonMessage";
import PropertyMessage from "./PropertyMessage";
// User validation
export const propertiesValidaions =(values)=>{
  const {name_required, name_more_than_characters} = CommonMessage;
  const {price_required, propertyRealtor_required, location_required, squarefeet_required, bedrooms_required, bathrooms_required} = PropertyMessage;
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
  // location
  // if(!values.location){
  //   errors.location= location_required;
  // }
  // squareFeet
  if(!values.squareFeet){
    errors.squareFeet= squarefeet_required;
  }
  // bedrooms
  if(!values.bedrooms){
    errors.bedrooms= bedrooms_required;
  }
  // bathrooms
  if(!values.bathrooms){
    errors.bathrooms= bathrooms_required;
  }
  // propertyRealtor
  if(!values.propertyRealtor){
    errors.propertyRealtor = propertyRealtor_required
  }
  return errors;
}
// End
