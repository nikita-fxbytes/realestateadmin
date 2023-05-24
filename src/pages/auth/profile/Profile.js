import ProfileLogic from "./ProfileLogic";
import CommonMessage from "../../../helper/message/CommonMessage";
import Spinner from "../../../components/spinner/Spinner";
const Profile = () => {
  const {enter_name, submit, name, email, mobile, enter_email, enter_mobile} = CommonMessage;//Message
  const {handleChange, handleSubmit, formValues, errors, loader,formLoader} = ProfileLogic();//Logic
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Profile</h6>
        </div>
        {loader && <Spinner/>}
        {formValues && 
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
                  <input type="email" className="form-control form-control-user"  placeholder={enter_email} name='email' onChange={handleChange} value={formValues.email??''}/>
                  {errors.email && <label className="text-danger mb-0"> {errors.email}</label>}
                </div>              
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group mb-2">
                  <label>{mobile}<span className="text-danger">*</span></label>
                  <input type="text" className="form-control form-control-user"  placeholder={enter_mobile} name='mobile' onChange={handleChange} value={formValues.mobile??''}/>
                  {errors.mobile && <label className="text-danger mb-0"> {errors.mobile}</label>}
                </div>              
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary btn-user" disabled={formLoader}>
              {formLoader && <span className="spinner-border spinner-border-sm me-1"></span>}
              {submit}
          </button>
        </div>
        </form>}
      </div>
    </>
  )
}
export default Profile;
