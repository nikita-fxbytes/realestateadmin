import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../components/pageheading/PageHeading";
import CommonMessage from "../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import MessageContext from '../../components/message/context/MessageContext'
import api from '../../api/Api';
import { roleValidation } from "./RoleValidation";
const RoleEdit = () => {
  const path = '/roles';//Base url
  const { id } = useParams();//Get id
  const navigate = useNavigate();  //redirect another page
  const {edit_role, enter_name, update, cancel, name, danger, success} = CommonMessage;//Message

  const {showMessage} = useContext(MessageContext);  //show message

  const [loader, setLoader]= useState(false)// loder
  //Get role 
  useEffect(()=>{
    getRole(id)
  },[]);
  // End
  // Get role
  const getRole = async(roleId) =>{
    setLoader(true);
    try {
      const res = await api.get(`${path}/${roleId}`)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setFormValue(resData.role)
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
    name: ''
  }
  const [formValues, setFormValue] = useState(intialValues)
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
    const errors = roleValidation(formValues)
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const {name} = formValues;
      const role = { name };
      editRole(role);
    }
  }
  // End
  // Edit Role api
  const editRole = async(formValues) =>{
    setLoader(true);
    try {
      const res = await api.put(`${path}/${id}`, formValues)
      const resData = res.data;
      console.log(resData.message)
      if(resData.status === true){
        setLoader(false)
        showMessage({
            message:resData.message,
            type: success
          });
          navigate(path);
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
  return (
    <>
      {/* Page heading */}
      <PageHeading heading={edit_role}/>
      {/* End */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{edit_role}</h6>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{name}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" name="name" placeholder={enter_name} value={formValues.name} onChange={handleChange}/>
                    {errors.name && <label className="text-danger mb-0"> {errors.name}</label>}
                  </div>              
                </div>
              </div>
          </div>
          <div className="card-footer">
            <Link to={path} className="btn btn-outline-primary mr-2">{cancel}</Link>
            <button type="submit" className="btn btn-primary btn-user" disabled={loader}>
              {loader && <span className="spinner-border spinner-border-sm me-1"></span>}
              {update}
            </button>
          </div>
        </form>
        {/* End */}
      </div>
    </>
  )
}
export default RoleEdit;

