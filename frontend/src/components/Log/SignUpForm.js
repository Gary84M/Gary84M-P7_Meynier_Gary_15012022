import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const first_nameError = document.querySelector(".first_name.error");
    const last_nameError = document.querySelector(".last_name.error");
    const dobError = document.querySelector(".dob.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
      if (!terms.checked) termsError.innerHTML = "Veuillez valider les CGV";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/users/register`,
        data: {
          first_name,
          last_name,
          dob,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            first_nameError.innerHTML = res.data.errors.first_name;
            last_nameError.innerHTML = res.data.errors.last_name;
            dobError.innerHTML = res.data.errors.dob;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="first_name">Prénom</label>
          <br />
          <input
            type="text"
            name="first_name"
            id="first_name"
            onChange={(e) => setFirst_name(e.target.value)}
            value={first_name}
          />
          <div className="first_name error"></div>
          <br />

          <label htmlFor="last_name">Nom</label>
          <br />
          <input
            type="text"
            name="last_name"
            id="last_name"
            onChange={(e) => setlast_name(e.target.value)}
            value={last_name}
          />
          <div className="last_name error"></div>
          <br />

          <label htmlFor="dob">Date de naissance</label>
          <br />
          <input
            type="date"
            name="dob"
            id="dob"
            onChange={(e) => setDob(e.target.value)}
            value={dob}
          />
          <div className="dob error"></div>
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
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
          <div className="password error"></div>
          <br />

          <label htmlFor="password-conf">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />

          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
