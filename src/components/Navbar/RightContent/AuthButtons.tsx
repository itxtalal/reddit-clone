import { Button } from "@chakra-ui/react";
import React from "react";

const AuthButtons: React.FC = () => {
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{
          base: "70px",
          sm: "flex",
        }}
        width={{
          base: "70px",
          md: "110px",
        }}
        mr={2}
        //onClick={()=>{}}
      >
        Log In
      </Button>
      <Button
        height="28px"
        display={{
          base: "70px",
          sm: "flex",
        }}
        width={{
          base: "70px",
          md: "110px",
        }}
        mr={2}
        //onClick={()=>{}}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
