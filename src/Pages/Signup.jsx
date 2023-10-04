import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { InvoiceLogo1, Logo } from "../components/imagepath"
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { alphaNumericPattern, emailrgx } from '../assets/constant'
import { useNavigate } from 'react-router-dom';

const schema = yup
    .object({
        username: yup.string().matches(alphaNumericPattern, 'please enther valid name')
            .required('Please enter your name'),
        email: yup
            .string()
            .matches(emailrgx, 'Email is required')
            .required('Email is required')
            .trim(),
        password: yup.string().min(6)
            .max(60).required('Password is required')
            .trim(),

        confirm_password: yup.string().min(6).max(60).required('ConfirmPassword is required').trim(),
    })
    .required()

const Signup = (props) => {

    const navigate = useNavigate()

    const [eye, seteye] = useState(true);
    const [emailerror, setEmailError] = useState("");
    const [nameerror, setNameError] = useState("");
    const [passworderror, setPasswordError] = useState("");
    const [formgroup, setFormGroup] = useState("");
    const [inputValues, setInputValues] = useState({
        email: "admin@dreamguys.co.in",
        password: "123456",
    });

    const {
        handleSubmit,
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        console.log("data", data)

        const { email, username, password } = data
        $.ajax({
            url: 'http://localhost:80/billing_api/users.php',
            type: "POST",
            data: {
                method: "insertUser",
                data: JSON.stringify({ password: password, user_name: username, email: email })
            },
            success: function (dataClient) {
                try {
                    // console.log(dataClient);
                    console.log(JSON.parse(dataClient))
                    navigate('/login')
                } catch (e) {
                    console.log(e)
                }
            },
            error: function (request, error) {
                console.log('Error')
                alert('Some error occured')
            }
        });
    }




    return (
        <div className="main-wrapper  login-body">

            <div className="login-wrapper">
                <div className="container">
                    <img className="img-fluid logo-dark mb-2" src={InvoiceLogo1} alt="Logo" />

                    <div className="loginbox">
                        <div className="login-right">
                            <div className="login-right-wrap">
                                <h1>Register</h1>
                                <p className="account-subtitle">Access to our dashboard</p>

                                {/* Form */}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group input_text login-eye">
                                        <label className="form-control-label">Email</label>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <div className="pass-group">
                                                    <input type='text' className={`form-control  ${errors?.password ? "error-input" : ""}`} value={value} onChange={onChange} autoComplete="false" />
                                                    {/* <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"}`} /> */}
                                                </div>
                                            )}
                                        />

                                        <small>{errors?.email?.message}</small>
                                    </div>
                                    <div className="form-group input_text login-eye">
                                        <label className="form-control-label">Username</label>
                                        <Controller
                                            name="username"
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <div className="pass-group">
                                                    <input type='text' className={`form-control  ${errors?.password ? "error-input" : ""}`} value={value} onChange={onChange} autoComplete="false" />
                                                    {/* <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"}`} /> */}
                                                </div>
                                            )}
                                        />

                                        <small>{errors?.password?.message}</small>
                                    </div>
                                    <div className="form-group input_text login-eye">
                                        <label className="form-control-label">Password</label>
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <div className="pass-group">
                                                    <input type={eye ? "password" : "text"} className={`form-control  ${errors?.password ? "error-input" : ""}`} value={value} onChange={onChange} autoComplete="false" />
                                                    {/* <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"}`} /> */}
                                                </div>
                                            )}
                                        />

                                        <small>{errors?.password?.message}</small>
                                    </div>
                                    <div className="form-group input_text login-eye">
                                        <label className="form-control-label">Confirm Password</label>
                                        <Controller
                                            name="confirm_password"
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <div className="pass-group">
                                                    <input type={eye ? "password" : "text"} className={`form-control  ${errors?.password ? "error-input" : ""}`} value={value} onChange={onChange} autoComplete="false" />
                                                    {/* <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"}`} /> */}
                                                </div>
                                            )}
                                        />

                                        <small>{errors?.confirmPassword?.message}</small>
                                    </div>
                                    <div className="form-group mb-0">
                                        <button className="btn btn-lg btn-block btn-primary w-100" type="submit">Register</button>
                                    </div>
                                </form>
                                {/* /Form */}

                                <div className="login-or">
                                    <span className="or-line"></span>
                                    <span className="span-or">or</span>
                                </div>
                                {/* Social Login */}
                                <div className="social-login">
                                    <span>Register with</span>
                                    <Link to="#" className="facebook"><i className="fab fa-facebook-f"></i></Link><Link to="#" className="google"><i className="fab fa-google"></i></Link>
                                </div>
                                {/* /Social Login */}
                                <div className="text-center dont-have">Already have an account? <Link to="/login">Login</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );

}
export default Signup;