import MessageContext from "../../components/message/context/MessageContext";
import PageHeading from "../../components/pageheading/PageHeading";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommonMessage from "../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import { editUserValidaions } from "./Validation";
import UserMessage from './UserMessage';
import api from "../../api/Api";

const EditUSer = () => {
  // Base url
  const path = '/users';
  const rolePath = '/roles';
  // End

  const { id } = useParams();//Get id
  const navigate = useNavigate();//redirect api
  const {showMessage} = useContext(MessageContext);//Show message

  //Message
  const {enter_name, submit, cancel, name, role, select_role, success, danger} = CommonMessage;
  const {edit_user, enter_email, enter_mobile, email, mobile, password, enter_password} = UserMessage;
  // End

 
  const [roleLoader, setRoleLoader] = useState(false);// Role loader
  const [roles, setRoles] = useState([]); //Roles 

  // Get role
  useEffect(()=>{
    getRoles();
    getUser(id);
  },[])
  // End
  // Get role Api
  const getRoles = async() =>{
    setRoleLoader(true);
    try {
      const res = await api.get(rolePath)
      const resData = res.data;
      if(resData.status === true){
        setRoleLoader(false);
        setRoles(resData.roles)
      }
    } catch (error) {
      setRoleLoader(false)
      const message = error.response.data.message;
        showMessage({
            message: message,
            type: danger
        });
    }
  }
  // End
   // Get User
   const [loader, setLoader] = useState(false);//Loader
   const getUser = async(userId) =>{
    setLoader(true);
    try {
      const res = await api.get(`${path}/${userId}`)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setFormValues(resData.user)
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
    const errors = editUserValidaions(formValues);
    setErrors(errors);
    if(Object.keys(errors).length ===0){
      const {name, email, mobile, password, roleId } = formValues;
      const user = {name, email, mobile, password, roleId}
      updateUser(user);
    }
  }
  // End
  // Update user api
  const updateUser = async(formValues) => {
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
      <PageHeading heading={edit_user}/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{edit_user}</h6>
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
                    <input type="password" className="form-control form-control-user" placeholder={enter_password} name='password' onChange={handleChange} autoComplete="password"/>
                    {errors.password && <label className="text-danger mb-0"> {errors.password}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{role}<span className="text-danger">*</span></label>
                    <select className="form-control" value={formValues.roleId} name="roleId" onChange={handleChange}>
                      <option>{select_role}</option>
                      {roles && roles.length>0 ?
                       roles.map((role)=>(
                        <option value={role._id} key={role._id}>{role ? role.name:''}</option>
                       ))
                        :
                        ''}
                    </select>
                    {roleLoader && <span className="spinner-border spinner-border-sm ml-n3"></span>}
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

export default EditUSer;
