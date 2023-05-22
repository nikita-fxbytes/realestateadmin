import CommonMessage from "../../helper/message/CommonMessage";
import InquiryMessages from "./InquiryMessages";
// User validation
export const inquiryValidaions =(values)=>{
    const {name_required, name_more_than_characters, email_required, email_format, mobile_required, mobile_more_than_characters, mobile_cannot_more_than_characters, } =CommonMessage;
    const {property_required, message_required } = InquiryMessages
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // Name
    if (!values.name){
        errors.name = name_required
    }else if(values.name.length <3){
        errors.name = name_more_than_characters
    }
    // Email
    if(!values.email){
        errors.email= email_required;
    }else if(!regex.test(values.email)){
        errors.email = email_format;
    }
    // Mobile
    if(!values.mobile){
        errors.mobile= mobile_required;
    } else if(values.mobile.length<10){
        errors.mobile = mobile_more_than_characters;
    } else if(values.mobile.length >15){
        errors.mobile = mobile_cannot_more_than_characters;
    } 
    //Property
    if (!values.property){
        errors.property = property_required;
    }
    //Message
    if (!values.message){
        errors.message = message_required
    }
    return errors;
}
// End
