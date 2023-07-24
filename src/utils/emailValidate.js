const emailValidate = (email) => {
  const regex = /\S+@\S+\.\S+/;
  const valid = regex.test(email);
  return valid;
};

module.exports = emailValidate;