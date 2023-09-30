import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
// import { InvoiceLogo1, Logo } from "../_components/imagepath"
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { alphaNumericPattern, emailrgx } from '../assets/constant'

const schema = yup
    .object({

        email: yup
            .string()
            // .matches(emailrgx, 'Email is required')
            .required('Email is required')
            .trim(),
        password: yup.string().min(6)
            .max(20).required('Password is required')
            .trim(),
    })

const Login = ({ setSalesmanCode }) => {

    const [eye, seteye] = useState(true);
    const [emailerror, setEmailError] = useState("");
    const [nameerror, setNameError] = useState("");
    const [passworderror, setPasswordError] = useState("");
    const [formgroup, setFormGroup] = useState("");
    const [inputValues, setInputValues] = useState({
        email: "admin@dreamguys.co.in",
        password: "123456",
    });

    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: inputValues,
    })

    const authenticateUser = (data) => {
        const { email, password } = data;
        // console.log(data)
        $.ajax({
            url: 'http://localhost:80/billing_api/users.php',
            type: "POST",
            data: {
                method: "login",
                data: JSON.stringify({ password: password, user_name: email })
            },
            success: function (dataClient) {
                try {
                    // console.log(dataClient);
                    console.log(JSON.parse(dataClient))
                    let thisData = JSON.parse(dataClient)
                    if (thisData.prompt === 'Authentication successful') {
                        navigate('/master-data')
                        setSalesmanCode(thisData.id)
                    } else if (dataClient === 'Authentication failed') {
                        alert('Invalid credentials')
                    }
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

    const onSubmit = (data) => {
        console.log("data", data)

        if (data.password !== "123456") {
            setError('password', {
                message: 'password is mismatch',
            })
        } else {
            clearErrors('password')
            navigate('/master-data')
        }
    }

    const onEyeClick = () => {
        seteye(!eye)
    }


    return (
        <>

            <div className="main-wrapper login-body">
                <div className="login-wrapper">
                    <div className="container">
                        {/* <img
                            className="img-fluid logo-dark mb-2"
                            src={InvoiceLogo1}
                            alt="Logo"
                        /> */}
                        <p className='text-3xl text-center'>Brand Logo</p>
                        <div className="loginbox">
                            <div className="login-right">
                                <div className="login-right-wrap">
                                    <h1>Login</h1>
                                    <p className="account-subtitle">Access to our dashboard</p>
                                    <div>
                                        <form onSubmit={handleSubmit(authenticateUser)}>

                                            <div className="form-group input_text">
                                                <label className="form-control-label">Email Address</label>
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({ field: { value, onChange } }) => (
                                                        <input className={`form-control  ${errors?.email ? "error-input" : ""}`} type="text" value={value} onChange={onChange} autoComplete="false" />

                                                    )}
                                                />

                                                <small>{errors?.email?.message}</small>
                                            </div>
                                            <div className="form-group input_text login-eye">
                                                <label className="form-control-label">Password</label>
                                                <Controller
                                                    name="password"
                                                    control={control}
                                                    render={({ field: { value, onChange } }) => (
                                                        <div className="pass-group">
                                                            <input type={eye ? "password" : "text"} className={`form-control  ${errors?.password ? "error-input" : ""}`} value={value} onChange={onChange} autoComplete="false" />
                                                            <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"}`} />
                                                        </div>
                                                    )}
                                                />

                                                <small>{errors?.password?.message}</small>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="cb1"
                                                            />
                                                            <label className="custom-control-label ms-1" htmlFor="cb1">
                                                                Remember me
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 text-end">
                                                        <Link className="forgot-link" to="/forgot-password"> Forgot Password ? </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-lg btn-block w-100 btn-primary w-100"
                                                type="submit"
                                            >
                                                Login
                                            </button>
                                        </form>
                                        <div className="login-or">
                                            <span className="or-line" />
                                            <span className="span-or">or</span>
                                        </div>
                                        {/* Social Login */}
                                        <div className="social-login mb-3">
                                            <span>Login with</span>
                                            <Link to="#" className="facebook">
                                                <i className="fab fa-facebook-f" />
                                            </Link>
                                            <Link to="#" className="google">
                                                <i className="fab fa-google" />
                                            </Link>
                                        </div>
                                        {/* /Social Login */}
                                        <div className="text-center dont-have">
                                            Dont have an account yet?
                                            <Link to="/register">Register</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}
export default Login;
