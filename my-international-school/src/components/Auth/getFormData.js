export const getFormDataRegister = e => {
const form = e.target;
const { registerEmail, nick, registerPassword } = form;

const formData = {
    email: registerEmail.value,
    nick: nick.value,
    password: registerPassword.value,
}

return formData
}

export const getFormDataLogin = e => {
    const form = e.target;
    const { loginEmail, loginPassword } = form;
    
    const formData = {
        email: loginEmail.value,
        password: loginPassword.value,
    }
    
    return formData
    }

