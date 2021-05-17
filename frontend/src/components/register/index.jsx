import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Register.scss";
import { Link } from 'react-router-dom';
import { Input, InputPassword, ButtonSubmit, MessageError } from "../../shared/components/";
import { POST } from "../../shared/services/requests";

const Register = () => {
  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [pwd, setPwd] = useState(''),
        [pwdConf, setPwdConf] = useState(''),
        [redirectVerify, setRedirectVerify] = useState(false),
        [errorEmail, setErrorEmail] = useState(null),
        [errorPwd, setErrorPwd] = useState(null);


  const getName = (e) => setName(e),
        getEmail = (e) => setEmail(e),
        getPwd = (e) => setPwd(e),
        getPwdConf = (e) => setPwdConf(e);
  
  const submit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      password: pwd,
      password_confirmation: pwdConf
    }
    
    POST('register', data).then(data => {
      localStorage.setItem('token', data.data.token)
      setRedirectVerify(true);
    }).catch(err =>{
      console.log(err.response.data.errors.password)
      setErrorEmail(err.response.data.errors.email);
      setErrorPwd(err.response.data.errors.password);
    })
  };

  if(redirectVerify) return <Redirect to="/verify" />;
  
  return (
    <>
      <h1 className="register-title">
        Sign Up Now
      </h1>

      <h2 className="register-sub-title">
        Please fill in the details and create an account
      </h2>

      <form 
        className="register-form"
        onSubmit={submit}>

        <Input 
          type="text"
          placeholder="Name"
          name="name"
          getState={getName}
        />

        {errorEmail != null ? <MessageError message = {errorEmail}/> : false}
        
        <Input 
          type="email"
          placeholder="Email"
          name="email"
          getState={getEmail}
        />
        
        {errorPwd != null ? <MessageError message = {errorPwd}/> : false}

        <InputPassword
          getState={getPwd}
          getStateConf={getPwdConf}
        />

        <ButtonSubmit name="Register" />

      </form>

      <p className="register-text">
        Already have an account?
        <Link
          className="register-link"
          to="/login"
        >
          Log In
        </Link>
      </p>
    </>
  );
};

export default Register;