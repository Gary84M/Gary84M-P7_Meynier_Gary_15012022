import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email .error");
    const passwordError = document.querySelector(".password .error");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/users/login`,
      withCredentials: true,
      data: { email, password },
    })
      .then((data) => {
        console.log(data);

        // if (res.error) {
        //   console.log(res.error);
        //   emailError.innerHTML = res.error;
        //   passwordError.innerHTML = res.error;
        //   console.log("ICI");

        window.location = "/";
      })
      .catch((err) => {
        setError("identifiants incorrects");
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error">{error}</div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
