import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div>
            <div className="login-1">
                <div className="container-fluid">
                    <div className="row login-box">
                        <div className="col-lg-6 align-self-center pad-0 form-section">
                            <div className="form-inner">
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Sorry,</strong> Something went wrong!
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                                <div className="form-group position-relative clearfix">
                                    <input name="email" type="email" className="form-control" placeholder="Email Address" aria-label="Email Address" />
                                    <i className="fa fa-info-circle"></i>
                                </div>
                                <div className="form-group clearfix position-relative password-wrapper">
                                <input name="password" type="password" className="form-control" autocomplete="off" placeholder="Password" aria-label="Password" />
                                <i className="fa fa-eye password-indicator"></i>
                            </div>
                            <div className="checkbox form-group clearfix">
                                <div className="form-check float-start">
                                    <input className="form-check-input" type="checkbox" id="rememberme" />
                                    <label className="form-check-label" for="rememberme">
                                        Remember me
                                    </label>
                                </div>
                                <a href="forgot-password-1.html" className="link-light float-end forgot-password">Forgot your password?</a>
                            </div>
                            <div className="form-group clearfix">
                                <button type="submit" className="btn btn-primary btn-lg btn-theme">Login</button>
                            </div>
                            <p>Don't have an account? <Link to="/register" className="thembo"> Register here</Link></p>
                            </div>

                        </div>
                    
                    <div className="col-lg-6 bg-color-15 pad-0 none-992 bg-img">
                        <div className="photo">
                            <img src="https://storage.googleapis.com/theme-vessel-items/checking-sites/oddo-html/HTML/main/assets/img/img-3.png" alt="logo" className="w-100 img-fluid" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
