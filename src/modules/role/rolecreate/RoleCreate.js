import { Link } from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import RoleCreateLogic from "./RoleCreateLogic";
const RoleCreate = () => {
  const {add_a_new_role, enter_name, submit, cancel, name, status} = CommonMessage;
  //Logic function
  const { handleSubmit, handleChange, 
          errors, loader, path, formValues, Status} = RoleCreateLogic()
  // End   
  return (
    <>
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
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" name="name" placeholder={enter_name}  onChange={handleChange}/>
                    {errors.name && <label className="text-danger mb-0"> {errors.name}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{status}<span className="text-danger">*</span></label>
                    <Status handleChange={handleChange} value={formValues.status}/>
                    {errors.status && <label className="text-danger mb-0"> {errors.status}</label>}
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