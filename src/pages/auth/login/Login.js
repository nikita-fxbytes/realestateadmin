import LoginMessage from "./LoginMessage";
const Login = () =>{
    // Message
    const {login, admin_login, forgot_password} =  LoginMessage;
    // End
    // 
   
   

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
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    placeholder="Enter Email Address..."/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"placeholder="Password"/>
                                            </div>
                                            <a href="index.html" className="btn btn-primary btn-user btn-block">
                                                {login}
                                            </a>
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
    )
}
export default Login;