import { Link, useNavigate } from "react-router-dom";
import PageHeading from "../../components/pageheading/PageHeading";
import CommonMessage from "../../helper/message/CommonMessage";
import { useContext, useState } from "react";
import MessageContext from '../../components/message/context/MessageContext'
import api from '../../api/Api';
import { roleValidation } from "../../helper/Validation";
const RoleCreate = () => {
  const path = '/roles';
  const navigate = useNavigate();  //redirect another page
  const {add_a_new_role, enter_name, submit, cancel, name} = CommonMessage;

  const {showMessage} = useContext(MessageContext);  //show message

  const [loader, setLoader]= useState(false)// lodader

  // Form value
  const intialValues = {
    name: ''
  }
  const [formValues, setFormValue] = useState(intialValues)
  // End
  const [error, setError] = useState({});// Error
  // input change value
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormValue({...formValues, [name]: value});
  }
  // End
  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = roleValidation(formValues)
    setError(errors);
    if (Object.keys(errors).length === 0) {
      const {name} = formValues;
      const role = { name };
      addRole(role);
    }
  }
  // End
  // Add Role
  const addRole = async(formValues) =>{
    setLoader(true);
    const {name} = formValues;
    // API call
    const role = { name } 
    try {
      const res = await api.post(path, role)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false)
        showMessage({
            message:resData.message,
            type:'success'
          });
          navigate(path);
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
  return (
    <>
      {/* Page heading */}
      <PageHeading heading={add_a_new_role}/>
      {/* End */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{add_a_new_role}</h6>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-md-6">

                  
                  <div className="form-group mb-0">
                    <label>{name}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" name="name" placeholder={enter_name} value={formValues.name} onChange={handleChange}/>
                    {error.name && <label className="text-danger mb-0"> {error.name}</label>}
                  </div>              
                </div>
              </div>
          </div>
          <div className="card-footer">
            <Link to={path} className="btn btn-outline-primary mr-2">{cancel}</Link>
            <button type="submit" className="btn btn-primary btn-user" disabled={loader}>
              {loader && <span className="spinner-border spinner-border-sm me-1"></span>}
              {submit}
            </button>
          </div>
        </form>
        {/* End */}
      </div>
    </>
  )
}

export default RoleCreate;