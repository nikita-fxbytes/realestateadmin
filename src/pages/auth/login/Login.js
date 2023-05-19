import LoginLogic from "./LoginLogic";
import LoginMessage from "./LoginMessage";
import CommonMessage from '../../../helper/message/CommonMessage'
const Login = () =>{
    const {login, admin_login, forgot_password} =  LoginMessage;// Message
    const {handleSubmit, handleChange, errors, loader} = LoginLogic();//Logic
    const { enter_email, enter_password} =CommonMessage;
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
                                                <input type="email" className="form-control form-control-user"  placeholder={enter_email} name='email' onChange={handleChange}/>
                                                {errors.email && <label className="text-danger mb-0"> {errors.email}</label>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" placeholder={enter_password} name='password' onChange={handleChange} autoComplete="password"/>
                                                {errors.password && <label className="text-danger mb-0"> {errors.password}</label>}
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
    );
}
export default Login;