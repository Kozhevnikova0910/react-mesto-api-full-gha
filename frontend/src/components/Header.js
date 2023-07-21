import logo from "../images/logo.svg";

function Header({label, link, email, onSignOut}) {
    return(
        <header className="header">
            <img src={logo} alt="лого" className="header__logo"/>
            {
                email ?
                    <div className="header__info">
                        <p className="header__email">{email}</p>
                        <button className="header__close" onClick={onSignOut}>Выйти</button>
                    </div>
                    :
                    <a className="header__label" href={link}>{label}</a>
            }
        </header>
    )
}

export default Header