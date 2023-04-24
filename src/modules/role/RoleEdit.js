import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../components/pageheading/PageHeading";
import CommonMessage from "../../helper/message/CommonMessage";
import { useContext, useEffect, useState } from "react";
import MessageContext from '../../components/message/context/MessageContext'
import api from '../../api/Api';
import { roleValidation } from "../../helper/Validation";
const RoleEdit = () => {
  const path = '/roles';
  const { id } = useParams();
  const navigate = useNavigate();  //redirect another page
  const {edit_role, enter_name, update, cancel, name} = CommonMessage;

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
  useEffect(()=>{
    getRole(id)
  },[])
    // Get Role
    const getRole = async(roleId) =>{
      // setLoader(true);
      try {
        const res = await api.get(`${path}/${roleId}`)
        const resData = res.data;
        if(resData.status === true){
          // setLoader(false);
          setFormValue(resData.role)
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
  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = roleValidation(formValues)
    setError(errors);
    if (Object.keys(errors).length === 0) {
      const {name} = formValues;
      const role = { name };
      editRole(role);
    }
  }
  // End
  // Edit Role
  const editRole = async(formValues) =>{
    setLoader(true);
    const {name} = formValues;
    // API call
    const role = { name } 
    try {
      const res = await api.put(`${path}/${id}`, role)
      const resData = res.data;
      console.log(resData.message)
      if(resData.status === true){
        setLoader(false)
        showMessage({
            message:resData.message,
            type:'success'
          });
          navigate(path);
      }
    } catch (error) {
      console.log(error)
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
                    {error.name && <label className="text-danger mb-0"> {error.name}</label>}
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

