import React, { useState } from "react";
import "./Register.scss";
import { Link } from 'react-router-dom';
import { Input, InputPassword, ButtonSubmit } from "../../shared/components/";
import { GET, POST } from './RegisterAPI.jsx';

const Register = () => {
  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [pwd, setPwd] = useState(''),
        [pwdConf, setPwdConf] = useState('');

  const getName = (e) => setName(e),
        getEmail = (e) => setEmail(e),
        getPwd = (e) => setPwd(e),
        getPwdConf = (e) => setPwdConf(e);
        
  // Post data to backend, url needs to be set up in RegisterApi      
  // const getData = async(apiEndpoint, data) => {
  //   const { data: items } = await POST(apiEndpoint, data);
  //   if (items) return console.log(items);
  //   if (!items) return console.log('error');
  // }
  
  const submit = () => {
    const data = {
      name: name,
      email: email,
      password: pwd,
      password_confirmation: pwdConf
    }
    
    POST('register', data).then(console.log(data))
    //token exists in data.data.token here, i think. can redirect to logged in page


    // Post data
    // getData('ApiEndpoint', data);
  };

  return (
    <>
      <h1 className="register-title">Sign Up Now</h1>
      <h2 className="register-sub-title">Please fill in the details and create an account</h2>

      <form className="register-form">
        <Input type="text" placeholder="Username" name="name" getState={getName}/>
        <Input type="email" placeholder="Email" name="email" getState={getEmail}/>
        <InputPassword getState={getPwd} getStateConf={getPwdConf}/>
        <ButtonSubmit name="Register" submit={submit} />
      </form>

      <p className="register-text">Already have an account?<Link className="register-link" to="/login">Log In</Link></p>
    </>
  );
};

export default Register;
