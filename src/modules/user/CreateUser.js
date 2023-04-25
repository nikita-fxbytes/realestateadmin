import { Link, useNavigate } from "react-router-dom";
import PageHeading from "../../components/pageheading/PageHeading";
import CommonMessage from "../../helper/message/CommonMessage";
import UserMessage from '../../helper/message/UserMessage';
import { useContext, useEffect, useState } from "react";
import MessageContext from "../../components/message/context/MessageContext";
import api from "../../api/Api";
import { userValidaions } from "./Validation";
const CreateUser = () => {
  const path = '/users';
  const rolePath = '/roles'
  const navigate = useNavigate();
  // Common Message
  const {enter_name, submit, cancel, name, role, select_role, success, danger} = CommonMessage;
  // End
  // User Message
  const {add_a_user, enter_email, enter_mobile, email, mobile, password, enter_password} = UserMessage;
  // End

  const {showMessage} = useContext(MessageContext);//Show message
  const [loader, setLoader] = useState(false);//Loader
  const [roles, setRoles] = useState([]); //roles
  // Get role
  useEffect(()=>{
    getRoles();
  },[])
  // End
  // Get role Api
  const getRoles = async() =>{
    // setLoader(true);
    try {
      const res = await api.get(rolePath)
      const resData = res.data;
      if(resData.status === true){
        // setLoader(false);
        setRoles(resData.roles)
      }
    } catch (error) {
      // setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
    }
  }
  // End
  // Form value
  const intialValues = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    roleId: ''
  }
  const [formValues, setFormValues] = useState(intialValues);
  const [errors, setErrors] = useState({});//Error
  // End
  // Input change
  const handleChange = (e) =>{
    const{name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors, [name]: '' });
    }
  }
  // End
  // Submit Form
  const handleSubmit = (e) =>{
    e.preventDefault();
    const errors = userValidaions(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, email, mobile, password, roleId } = formValues;
      const user = {name, email, mobile, password, roleId}
      addUser(user);
    }
  }
  // End
  // Add user api
  const addUser = async(formValues) => {
    setLoader(true);
    try {
      const res = await api.post(path, formValues)
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

  return (
    <>
      <PageHeading heading={add_a_user}/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{add_a_user}</h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{name}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" name='name' value={formValues.name} placeholder={enter_name} onChange={handleChange}/>
                    {errors.name && <label className="text-danger mb-0"> {errors.name}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{email}<span className="text-danger">*</span></label>
                    <input type="email" className="form-control form-control-user"  placeholder={enter_email} name='email' onChange={handleChange} value={formValues.email}/>
                    {errors.email && <label className="text-danger mb-0"> {errors.email}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{mobile}<span className="text-danger">*</span></label>
                    <input type="number" className="form-control form-control-user"  placeholder={enter_mobile} name='mobile' onChange={handleChange} value={formValues.mobile}/>
                    {errors.mobile && <label className="text-danger mb-0"> {errors.mobile}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{password}<span className="text-danger">*</span></label>
                    <input type="password" className="form-control form-control-user" placeholder={enter_password} name='password' onChange={handleChange} value={formValues.password} autoComplete="password"/>
                    {errors.password && <label className="text-danger mb-0"> {errors.password}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{role}<span className="text-danger">*</span></label>
                    <select className="form-control" name="roleId" onChange={handleChange}>
                      <option>{select_role}</option>
                      {roles && roles.length>0 ?
                       roles.map((role)=>(
                        <option value={role._id} key={role._id}>{role ? role.name:''}</option>
                       ))
                        :
                        ''}
                    </select>
                    {errors.roleId && <label className="text-danger mb-0"> {errors.roleId}</label>}
                  </div>              
                </div>
              </div>
          </div>
          <div className="card-footer">
            <Link to='/users' className="btn btn-outline-primary mr-2">{cancel}</Link>
            <button type="submit" className="btn btn-primary btn-user" disabled={loader}>
              {loader && <span className="spinner-border spinner-border-sm me-1"></span>}
              {submit}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
export default CreateUser;
