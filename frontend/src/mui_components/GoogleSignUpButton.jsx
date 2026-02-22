import * as React from "react";
// import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

//used upload button from mui
export default function GoogleSignUpButton({ onClick }) {
  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{ borderRadius: 9, backgroundColor: "black" }}
      onClick={onClick}
    >
      Continue with Google
    </Button>
  );
}
