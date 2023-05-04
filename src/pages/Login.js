import React, { useEffect, useState } from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import Logo1 from "../assests/defy_logo-removebg-preview.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/auth/authSlice"

const images = [
  require('../assests/285820107_969410360393154_8615687616660637758_n.jpg'),
  require('../assests/299934016_606137061154381_4926188596946588395_n.jpg'),
  require("../assests/315897274_1310933299654769_6150792394996701061_n.jpg"),
  require("../assests/299228253_760910808572564_2479402739618947677_n.jpg"),
  require("../assests/174304971_162941172375004_4470709580256700664_n.jpg"),
  require("../assests/291986335_580280366956910_247166510855750651_n.jpg"),
  require("../assests/299855809_464251461968427_3382595852652178942_n.jpg"),
  require("../assests/280658654_744348826772712_3740684213881336350_n.jpg"),
  require("../assests/287059290_1219115748831788_8353289818307487506_n.jpg"),
  require("../assests/279574116_1393017354548923_191593714226726875_n.jpg"),
  require("../assests/281779478_293827942840968_522703434417999603_n.jpg"),
  require("../assests/299601210_593333319130926_8669958029937745870_n.jpg"),
  require("../assests/285862204_1644431799263076_2985826676092941228_n.jpg")
]

const imageCount = images.length;
let schema = Yup.object().shape({
  email: Yup.string().email("Please Enter a Valid Email").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageCount);
    }, 5500);
    return () => clearInterval(intervalId)
  }, [])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values))
    },
  });
  const authState = useSelector((state) => state)

  const { user, isLoading, isError, isSuccess, message } = authState.auth;
  useEffect(() => {
    if (isSuccess) {
      navigate("admin")
    }
    else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading])
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <Container fluid>
        <Row>
          <Col md={6} className="p-0">
            <img src={images[currentImageIndex]} alt="DEFY Picture" className='opacity-80' style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />

          </Col>
          <Col>
            <img src={Logo1} alt="DEFY Logo" style={{ width: '27%', height: "20%" }} />

            <div className="mt-0 px-5 w-75 py-3">
              <h1 className='text-left title text-[#260810]'>SignIn</h1>
              <p className='text-left text-[#2F4F5E]'>Login to your account to continue</p>
              <form action="" className='mt-4' onSubmit={formik.handleSubmit}>
                <CustomInput type="text" name="email" label="Email Address" id="email" val={formik.values.email}
                  onChng={formik.handleChange("email")} />
                <div className="error">
                  {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
                  {message.message == "Rejected" ? "You are not an Admin" : ""}
                </div>
                <CustomInput type={showPassword ? "text" : "password"} name="password" label="Password" id="password" val={formik.values.password}
                  onChng={formik.handleChange("password")}
                  icon={showPassword ? <FaEyeSlash onClick={toggleShowPassword} /> : <FaEye onClick={toggleShowPassword} />} />
                <div className="error">
                  {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
                </div>
                <button className='border-0 rounded-3 px-3 py-1 text-white font-light w-35 fs-5 text-decoration-none my-3' type="submit" style={{ backgroundColor: "#FBA71A" }} >Login</button>

                {/* <div className='mb-3 text-start'>
                  <Link to="forgot-password" className='text-[#2F4F5E]' style={{ textDecoration: "none" }}>FORGOT LOGIN PASSWORD?
                  </Link>
                </div> */}
              </form>
            </div>

          </Col>

        </Row>
      </Container >
    </div >
  );
};

export default Login;
