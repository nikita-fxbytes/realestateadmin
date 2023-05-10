import { useNavigate, useParams } from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import MessageContext from "../../../components/message/context/MessageContext";
import { propertiesValidaions } from "../PropertyValidations";
import api from '../../../api/Api'
const PropertyEditLogic = () => {
  // Base path
  const path = '/properties';
  const userPath = '/users';
  // End

  // Redirect url
  const navigate = useNavigate();
  // End
  
  const { id } = useParams();//Get id

  const {showMessage} = useContext(MessageContext);//Show message

  // Message
  const {danger, success} = CommonMessage;
  // End

  const [userLoader, setUserLoader] = useState(false);//Loader
  const [users, setUsers] = useState([]); //User loader

  // Get role
  useEffect(()=>{
    getUsers();
    getProperty(id);
  },[])
  // End

  // Get user api
  const getUsers = async() =>{
    setUserLoader(true);
    try {
      const res = await api.get(`${userPath}?roleName=propertyrealtor`)
      const resData = res.data;
      if(resData.status === true){
        setUserLoader(false);
        setUsers(resData.users)
      }
    } catch (error) {
      setUserLoader(false)
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
    }
  }
  // End

   // Get property
   const [loader, setLoader] = useState(false);//Loader
   const getProperty = async(propertyId) =>{
    setLoader(true);
    try {
      const res = await api.get(`${path}/${propertyId}`)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setFormValues(resData.property)
      }
    } catch (error) {
      setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message:message,
            type: danger
        });
    }
  }
  // End

  // Form value
  const intialValues = {
    name: '',
    price: '',
    location: '',
    squareFeet: '',
    garage: '',
    bedrooms: '',
    bathrooms: '',
    propertyRealtor: ''
  }
  const [formValues, setFormValues] = useState(intialValues);
  const [errors, setErrors] = useState({});//Error
  // End
  // Input change
  const handleChange = (e) =>{
    let {name, value} = e.target;
    if (name === 'price' || name ==='squareFeet') {
      // restrict input to only numbers for the 'mobile' field
      const regex = /[^0-9.]/g; // match anything that's not a digit
      value = value.replace(regex, ''); // update the value variable with the filtered value
    }
    if(name === 'garage' || name ==='bedrooms' || name === 'bathrooms'){
      // restrict input to only numbers for the 'mobile' field
      const regex = /[^0-9]/g;  // match anything that's not a digit
      value = value.replace(regex, ''); // update the value variable with the filtered value
    }
    setFormValues({...formValues, [name]: value});
    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors, [name]: '' });
    }
  }
  // End
  // Submit Form
  const handleUpdate = (e) =>{
    e.preventDefault();
    const errors = propertiesValidaions(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, price, location, squareFeet, garage, bedrooms, bathrooms, propertyRealtor } = formValues;
      const properties = {name, price, location, squareFeet, garage, bedrooms, bathrooms, propertyRealtor}
      updateProperty(properties);
    }
  }
  // End
  // Update property api
  const updateProperty = async(formValues) => {
    setLoader(true);
    try {
      const res = await api.put(`${path}/${id}`, formValues)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        showMessage({
          message: resData.message,
          type: success
        });
        navigate(path);
      }
      
    } catch (error) {
      setLoader(false);
      const message = error.response.data.message;
      showMessage({
        message: message,
        type: danger
      });
    }
  }
  // End
  return {
    userLoader,
    users,
    loader,
    errors,
    handleChange,
    handleUpdate,
    formValues,
    path
  }
}

export default PropertyEditLogic;
