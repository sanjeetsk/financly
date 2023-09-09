import React, { useState } from 'react'
import './style.css';
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

// label, type, state, setState, placeholder
const SignUpLogin = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);

  //Authenticate the user with Email and Password
  function handleEmailSignUp() {
    setLoading(true);
    if (fullname !== "" && email !== "" && password.length > 6 && cpassword === password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user created >>", user);
          toast.success("success")
          setLoading(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ..
        });
    }
    else {
      toast.error("All field are mandatory!");
      setLoading(false);
    }
  }

  function handleGoogle() {
    alert("Success")
  }

  return (
    <div className='signup-wrapper'>
      <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>Financly.</span></h2>
      <form>
        <Input
          label="Full Name"
          type="text"
          state={fullname}
          setState={setFullName}
          placeholder="Full Name"
        />
        <Input
          label="Email"
          type="email"
          state={email}
          setState={setEmail}
          placeholder="Example@gmail.com"
        />
        <Input
          label="Password"
          type="password"
          state={password}
          setState={setPassword}
          placeholder="Exampl@123"
        />
        <Input
          label="Confirm Password"
          type="password"
          state={cpassword}
          setState={setCpassword}
          placeholder="Example@123"
        />
        <Button text={"SignUp Using Email and Password"} onClick={handleEmailSignUp} loading={loading} />
        <p style={{ textAlign: "center", margin: "0px", padding: "0px" }}>or</p>
        <Button text={"SignUp Using Google"} blue={"blue"} onClick={handleGoogle} />
      </form>
    </div>
  )
}

export default SignUpLogin
