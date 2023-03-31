import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import myImage from "../assests/285820107_969410360393154_8615687616660637758_n.jpg";
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';
import Logo1 from "../assests/defy_logo-removebg-preview.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <Container fluid>
        <Row>
          <Col md={6} className="p-0">
            <img src={myImage} alt="DEFY Picture" className='opacity-80' style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
          </Col>
          <Col>
            <img src={Logo1} alt="DEFY Logo" style={{ width: '27%', height: "20%" }} />

            <div className="mt-0 px-5 w-75 py-3">
              <h1 className='text-left title text-[#260810]'>SignIn</h1>
              <p className='text-left text-[#2F4F5E]'>Login to your account to continue</p>
              <form action="" className='mt-4'>
                <CustomInput type="text" label="Email Address" id="email" />
                <CustomInput type={showPassword ? "text" : "password"} label="Password" id="password"
                  icon={showPassword ? <FaEyeSlash onClick={toggleShowPassword} /> : <FaEye onClick={toggleShowPassword} />} />
                <Link to="/admin">
                  <button className='border-0 rounded-3 px-3 py-1 text-white font-light w-35 fs-5 text-decoration-none my-3' type="submit" style={{ backgroundColor: "#FBA71A" }} >Login</button>
                </Link>
                <div className='mb-3 text-start'>
                  <Link to="forgot-password" className='text-[#2F4F5E]' style={{ textDecoration: "none" }}>FORGOT LOGIN PASSWORD?
                  </Link>
                </div>
              </form>
            </div>

          </Col>

        </Row>
      </Container >
    </div >
  );
};

export default Login;
