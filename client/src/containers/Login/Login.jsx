import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <div>
      <Navbar page="login" />
      <LoginForm />
    </div>
  );
}

export default Login;
