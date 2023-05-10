import { Link} from "react-router-dom";
import PageHeading from "../../../components/pageheading/PageHeading";
import CommonMessage from "../../../helper/message/CommonMessage";
import RoleEditLogic from "./RoleEditLogic";

const RoleEdit = () => {
  const {edit_role, enter_name, update, cancel, name} = CommonMessage;//Message
  const {handleSubmit, handleChange, errors, formValues, loader, path, id} = RoleEditLogic()
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

