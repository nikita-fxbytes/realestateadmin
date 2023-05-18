import LoginMessage from "./LoginMessage";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import MessageContext from '../../../components/message/context/MessageContext'
import api from '../../../api/Api';
import { TOKEN } from "../../../helper/Constent";
import { setUserToken } from "../../../helper/CommonFunction";
import AuthContext from "../../../helper/auth/AuthContext";
const Login = () =>{
  const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();  //redirect another page
    // Message
    const {login, admin_login, forgot_password} =  LoginMessage;
    // End
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
    // const errors = roleValidation(formValues)
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
        setIsLoggedIn(true);
        setLoader(false)
        showMessage({
            message:resData.message,
            type:'success'
          });
          setUserToken(resData.authToken)
          navigate('/dashboard');
      }
    } catch (error) {
      setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message:message,
            type:'danger'
        });
    }
  }
  // End
    return(
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">{admin_login}</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    placeholder="Enter Email Address..." name="email" onChange={handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"placeholder="Password" name="password" onChange={handleChange}/>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-user btn-block" disabled={loader}>
                                                {loader && <span className="spinner-border spinner-border-sm me-1"></span>}
                                                {login}
                                                </button>
                                         
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small" href="forgot-password.html">{forgot_password}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;