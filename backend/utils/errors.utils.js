module.exports.signupErrors = (error) => {
  let errors = {
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    password: "",
  };
  if (error.message.include("first_name"))
    errors.first_name = "Prénom déjà utilisé";

  if (error.message.include("last_name")) errors.last_name = "Nom déjà utilisé";

  if (error.message.include("email")) errors.email = "Email incorrect";

  if (error.message.include("dob")) errors.dob = "dob déjà utilisé";

  if (error.message.include("password"))
    errors.password = "Le mot de passe doit contenir au moins 6 caractères";

  if (error.code === 11000) errors.email = "Cet email est déjà enregistré";

  return errors;
};
