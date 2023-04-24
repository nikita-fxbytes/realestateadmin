import { Link } from "react-router-dom";
import PageHeading from "../../components/pageheading/PageHeading";
import CommonMessage from "../../helper/message/CommonMessage";
import UserMessage from '../../helper/message/UserMessage';
const EditUSer = () => {
  const {enter_name, update, cancel, name, role, select_role} = CommonMessage;
  const {edit_user, enter_email, enter_mobile, email, mobile, password, enter_password} = UserMessage;
  return (
    <>
      <PageHeading heading={edit_user}/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{edit_user}</h6>
        </div>
        <form>
          <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{name}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_name}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{email}<span className="text-danger">*</span></label>
                    <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_email}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{mobile}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_mobile}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{password}<span className="text-danger">*</span></label>
                    <input type="password" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_password}/>
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{role}<span className="text-danger">*</span></label>
                    <select className="form-control">
                      <option>{select_role}</option>
                    </select>
                  </div>              
                </div>
              </div>
          </div>
          <div className="card-footer">
            <Link to='/users' className="btn btn-outline-primary mr-2">{cancel}</Link>
            <button type="submit" className="btn btn-primary btn-user">{update}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditUSer;
