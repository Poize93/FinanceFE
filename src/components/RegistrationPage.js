import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({
    userName: "",
    password: "",
    verifyPassword: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  //
  // const modules = {
  //   toolbar: {
  //     container: "#toolbar",
  //     handlers: {
  //       undo: undoChange,
  //       redo: redoChange,
  //     },
  //   },
  //   history: {
  //     delay: 500,
  //     maxStack: 100,
  //     userOnly: true,
  //   },
  // };

  // const QuillToolbar = () => (
  //   <div id="toolbar">
  //     <span className="ql-formats">
  //       <select className="ql-font" defaultValue="arial">
  //         <option value="arial">Arial</option>
  //         <option value="comic-sans">Comic Sans</option>
  //         <option value="courier-new">Courier New</option>
  //         <option value="georgia">Georgia</option>
  //         <option value="helvetica">Helvetica</option>
  //         <option value="lucida">Lucida</option>
  //       </select>
  //       <select className="ql-size" defaultValue="medium">
  //         <option value="extra-small">Size 1</option>
  //         <option value="small">Size 2</option>
  //         <option value="medium">Size 3</option>
  //         <option value="large">Size 4</option>
  //       </select>
  //       <select className="ql-header" defaultValue="3">
  //         <option value="1">Heading</option>
  //         <option value="2">Subheading</option>
  //         <option value="3">Normal</option>
  //       </select>
  //     </span>
  //     <span className="ql-formats">
  //       <button className="ql-bold" />
  //       <button className="ql-italic" />
  //       <button className="ql-underline" />
  //       <button className="ql-strike" />
  //     </span>
  //     <span className="ql-formats">
  //       <button className="ql-list" value="ordered" />
  //       <button className="ql-list" value="bullet" />
  //       <button className="ql-indent" value="-1" />
  //       <button className="ql-indent" value="+1" />
  //     </span>
  //     <span className="ql-formats">
  //       <button className="ql-script" value="super" />
  //       <button className="ql-script" value="sub" />
  //       <button className="ql-blockquote" />
  //       <button className="ql-direction" />
  //     </span>
  //     <span className="ql-formats">
  //       <select className="ql-align" />
  //       <select className="ql-color" />
  //       <select className="ql-background" />
  //     </span>
  //     <span className="ql-formats">
  //       <button className="ql-link" />
  //       <button className="ql-image" />
  //       <button className="ql-video" />
  //     </span>
  //     <span className="ql-formats">
  //       <button className="ql-formula" />
  //       <button className="ql-code-block" />
  //       <button className="ql-clean" />
  //     </span>
  //     <span className="ql-formats">
  //       <button className="ql-undo">
  //         <CustomUndo />
  //       </button>
  //       <button className="ql-redo">
  //         <CustomRedo />
  //       </button>
  //     </span>
  //   </div>
  // );

  // function undoChange() {
  //   this.quill.history.undo();
  // }
  // function redoChange() {
  //   this.quill.history.redo();
  // }

  // const CustomUndo = () => (
  //   <svg viewBox="0 0 18 18">
  //     <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
  //     <path
  //       className="ql-stroke"
  //       d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
  //     />
  //   </svg>
  // );

  // // Redo button icon component for Quill editor
  // const CustomRedo = () => (
  //   <svg viewBox="0 0 18 18">
  //     <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
  //     <path
  //       className="ql-stroke"
  //       d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
  //     />
  //   </svg>
  // );

  // function MyComponent() {
  //   const [value, setValue] = useState("");

  //   return (
  //     <>
  //       {" "}
  //       <QuillToolbar />
  //       <ReactQuill
  //         theme="snow"
  //         value={value}
  //         onChange={setValue}
  //         placeholder="Write your Review"
  //         modules={modules}
  //       />{" "}
  //     </>
  //   );
  // }

  //
  const isLive = true;
  const hostName = !!isLive
    ? "https://financebe.onrender.com"
    : "http://localhost:5678";

  const handleLogInFuction = async () => {
    try {
      const response = await fetch(`${hostName}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userDetails?.userName,
          password: userDetails?.password,
        }),
      });

      response.json().then((res) => {
        if (res?.status === 200) {
          window.sessionStorage.setItem("token", res?.token);
          window.sessionStorage.setItem("userName", res?.userName);
          navigate("/detailPage");
        } else {
          window.alert(res?.message);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegisterFunction = async () => {
    try {
      const response = await fetch(`${hostName}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userDetails?.userName,
          password: userDetails?.password,
        }),
      });

      response.json().then((res) => {
        if (res?.status === 200) {
          handleLogInFuction();
        } else {
          window.alert(res?.message);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className="d-flex justify-content-center" sx={{ minHeight: "100vh" }}>
      <Box className="d-flex flex-column align-items-center justify-content-center w-100">
        <TextField
          required
          id="userName"
          label="User Name"
          variant="standard"
          className="m-3"
          onChange={(e) => {
            setuserDetails({
              ...userDetails,
              userName: e.target.value,
            });
          }}
        />
        <TextField
          required
          id="password"
          label="Password"
          variant="standard"
          type="password"
          className="m-3"
          onChange={(e) => {
            setuserDetails({
              ...userDetails,
              password: e.target.value,
            });
          }}
        />
        {!isLoggedIn && (
          <TextField
            required
            id="verifyPassword"
            label="Verify Password"
            type="password"
            variant="standard"
            className="m-3"
            error={
              !!userDetails.verifyPassword &&
              userDetails.password !== userDetails.verifyPassword
            }
            helperText={
              !!userDetails.verifyPassword &&
              userDetails.password !== userDetails.verifyPassword &&
              "must be similar to Password"
            }
            onChange={(e) => {
              setuserDetails({
                ...userDetails,
                verifyPassword: e.target.value,
              });
            }}
          />
        )}
        {/* <div style={{ minHeight: "200px", margin: "10px" }}>
          <MyComponent />
        </div> */}
        <Button
          variant="outlined"
          onClick={isLoggedIn ? handleLogInFuction : handleRegisterFunction}
          disabled={
            !userDetails.userName ||
            !userDetails.password ||
            (!isLoggedIn && !userDetails.verifyPassword)
          }
        >
          {isLoggedIn ? "Log In" : "Register"}
        </Button>
        <Button
          // variant="outlined"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="mt-2 mb-2"
        >
          {!isLoggedIn ? "Already have an Account" : "Get An Account"}
        </Button>
      </Box>{" "}
    </Box>
  );
}
