import React from 'react'

function Login({onSignInClick}) {
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
        onSignInClick({
            password: pass,
            email: email,
        });
    }

    return (
        <div className="sign__container">
            <h1 className="sign__title">Вход</h1>
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
                    Войти
                </button>
            </form>
        </div>
    )
}

export default Login;
