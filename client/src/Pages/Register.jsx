import { SignUp } from "@clerk/clerk-react";
import React, { useState } from "react";

const Register = () => {

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
        <SignUp
          signInUrl="/login"
          forceRedirectUrl={"/"}
        />
      </div>
    </div>
  );
};

export default Register;
