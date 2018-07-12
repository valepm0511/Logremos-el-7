window.controller = {};

window.controller.validateLogin = (email, password) => {
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (email.length === 0 || password.length === 0) {
    return {
      valid: false,
      message: 'No debe dejar campos vacíos'
    };
  } else if ((emailRegex.test(email)) === false) {
    return {
      valid: false,
      message: 'Debe ingresar un mail valido'
    };
  } else if (password.length < 6) {
    return {
      valid: false,
      message: 'La contraseña debe contener minimo 6 caracteres'
    };
  };
  return {
    valid: true,
    message: ''
  };
};

window.controller.register = () => {
  let makeMail = document.getElementById('makeMail').value;
  let makePassword = document.getElementById('makePassword').value;

  const isValid = window.controller.validateLogin(makeMail, makePassword);

  if (isValid.valid) {
    window.data.register(makeMail, makePassword);
    alert('Cuenta creada');
  } else {
    alert(isValid.message);
  }
};