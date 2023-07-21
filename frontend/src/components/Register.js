import React from 'react'

function Register({onSignUpClick}) {
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePass(e) {
        setPass(e.target.value)
    }

    function handleSubmitClick(e) {
        e.preventDefault()
        onSignUpClick({
            password: pass,
            email: email
        });
    }

    return (
        <div className="sign__container">
            <h1 className="sign__title">Регистрация</h1>
            <form
                className="sign__form"
                method="post"
                name="login"
                onSubmit={handleSubmitClick}
            >
                <input
                    value={email}
                    onChange={handleChangeEmail}
                    className="sign__input"
                    name="name"
                    type="text"
                    placeholder="Email"
                    required
                />
                <input
                    value={pass}
                    onChange={handleChangePass}
                    className="sign__input"
                    name="about"
                    type="password"
                    placeholder="Пароль"
                    required
                />
                <button
                    className="sign__save"
                    type="submit"
                >
                    Зарегистрироваться
                </button>
            </form>
            <div className='sign__field'>
                <h2 className="sign__subtitle">
                    Уже зарегистрированы?
                </h2>
                <a className="sign__link" href='/sign-in'>
                    Войти
                </a>
            </div>
        </div>
    )
}

export default Register;
