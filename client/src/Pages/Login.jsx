import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Login = () => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <SignIn
          signUpUrl="/signup"
          forceRedirectUrl={"/"}
        />      
      </div>
    </div>
  );
};

export default Login;
