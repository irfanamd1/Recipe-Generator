import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Login = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <SignIn
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
        signUpUrl="/signup"
        forceRedirectUrl={"/"}
      />
    </div>
  );
};

export default Login;
