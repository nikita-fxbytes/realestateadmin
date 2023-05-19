import createAPI from '../../../api/Api';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginValidations } from "./LoginValidations";
import AuthContext from "../../../helper/auth/AuthContext";
import { setUserToken } from "../../../helper/CommonFunction";
import MessageContext from '../../../components/message/context/MessageContext';

const LoginLogic = () =>{
  // Api
  const apiCreator = createAPI();
  const api = apiCreator();
  // End
  const { setIsLoggedIn } = useContext(AuthContext);//Check login
  const navigate = useNavigate();  //redirect another page
  const {showMessage} = useContext(MessageContext);  //show message
  const [loader, setLoader]= useState(false)// lodader
   // Form value
  const intialValues = {
    email: '',
    password:''
  }
  const [formValues, setFormValue] = useState(intialValues);
  // End
  const [errors, setErrors] = useState({});// Error
  // input change value
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormValue({...formValues, [name]: value});
    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors, [name]: '' });
    }
  }
  // End
  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = LoginValidations(formValues)
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const {email, password} = formValues;
      const loginvalue = { email, password };
      userLogin(loginvalue);
    }
  };
  // End
  // Add role api
  const userLogin = async(formValues) =>{
    setLoader(true);
    try {
      const res = await api.post(`/login`, formValues)
      const resData = res.data;
      if(resData.status === true){
        setUserToken(resData.authToken)
        navigate('/dashboard');
        setIsLoggedIn(true);
        showMessage({
            message:resData.message,
            type:'success'
          });
         
      }
    } catch (error) {
      const message = error.response.data.message;
        showMessage({
            message:message,
            type:'danger'
        });
    }finally{
      setLoader(false);
    }
  }
  // End
  return{handleSubmit, handleChange, errors, loader}
}
export default LoginLogic;