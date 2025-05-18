export const validateUserName = (value: string) => {
  if (!value.includes(" ") && value.trim().length > 0) {
    return {
      show: true,
      message: "Digite um nome e sobrenome de usuário válido",
    };
  } else {
    return { show: false, message: "" };
  }
};

export const validateEmail = (email: string) => {
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      show: true,
      message: "Digite um email válido",
    };
  } else {
    return { show: false, message: "" };
  }
};

export const validatePassword = (password: string) => {
  const passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      show: true,
      message:
        "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais",
    };
  } else {
    return { show: false, message: "" };
  }
};
