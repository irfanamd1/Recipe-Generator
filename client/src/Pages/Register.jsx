import { SignUp } from "@clerk/clerk-react";
import React from "react";

const Register = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: {
              fontSize: 14,
              textTransform: "none",
              backgroundColor: "#611BBD",
              "&:hover, &:focus, &:active": {
                backgroundColor: "#49247A",
              },
            },
          },
        }}
        signInUrl="/login"
        forceRedirectUrl={"/"}
      />
    </div>
  );
};

export default Register;
