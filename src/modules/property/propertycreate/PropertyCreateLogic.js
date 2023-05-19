import createAPI from "../../../api/Api";
import {useNavigate} from "react-router-dom";
import Status from "../../../components/status/Status";
import LogOutLogic from "../../../helper/auth/LogOutLogic";
import { useContext, useEffect, useState } from "react";
import { propertiesValidaions } from "../PropertyValidations";
import CommonMessage from "../../../helper/message/CommonMessage";
import { LIMIT, ORDERBY, STATUSCODE } from "../../../helper/Constent";
import MessageContext from "../../../components/message/context/MessageContext";

const PropertyCreateLogic = () => {
  const {logOut} = LogOutLogic();//Logout
  // Api
  const apiCreator = createAPI();
  const api = apiCreator(); 
  // End
  // Base path
  const path = '/properties';
  const userPath = '/users';
  // End
  const navigate = useNavigate();// Redirect url
  const {showMessage} = useContext(MessageContext);//Show message
  const { danger, success} = CommonMessage; //Messages 
  const [userLoader, setUserLoader] = useState(false);//Loader
  const [users, setUsers] = useState([]); //User loader
  // Get user
  useEffect(()=>{
    getUsers();
  },[]);
  // End
  // Get user api
  const getUsers = async() =>{
    setUserLoader(true);
    try {
      const body = {
        searchTerm: '',
        sortColumn: ORDERBY.CREATEDAT, 
        sortDirection: ORDERBY.DESC, 
        page: '',
        perPage: '',
        roleName: 'propertyrealtor',
        onlyActive: LIMIT.ITEMONE,
        status: ''
      };
      const res = await api.post(userPath, body)
      const resData = res.data;
      if(resData.status === true){
        setUsers(resData.users)
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
        setUserLoader(false)
      }
    }
  // End

  // Form value
  const [loader, setLoader] = useState(false);//Form loader
  const intialValues = {
    name: '',
    price: '',
    location: '',
    squareFeet: '',
    garage: '',
    bedrooms: '',
    bathrooms: '',
    propertyRealtor: '',
    status: LIMIT.ITEMONE
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
  };
  // End
  // Submit Form
  const handleSubmit = (e) =>{
    e.preventDefault();
    const errors = propertiesValidaions(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, price, location, squareFeet, garage, bedrooms, bathrooms, propertyRealtor, status } = formValues;
      const properties = {name, price, location, squareFeet, garage, bedrooms, bathrooms, propertyRealtor, status}
      addProperty(properties);
    }
  }
  // End
  // Add property api
  const addProperty = async(formValues) => {
    setLoader(true);
    try {
      const res = await api.post(`${path}/create`, formValues)
      const resData = res.data;
      if(resData.status === true){
        showMessage({
          message: resData.message,
          type: success
        });
        navigate(path);
      }else if(resData.status === false){
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
        setLoader(false);
      }
    }
  // End
  return { handleSubmit, handleChange, Status, userLoader, loader, errors, users, path, formValues}
}
export default PropertyCreateLogic;

