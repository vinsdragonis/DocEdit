import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function Register() {
  return (
    <div>
      <Navbar page="register" />
      <RegisterForm />
    </div>
  );
}

export default Register;
