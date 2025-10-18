import Logo from "./Logo"
import '../styles/Header.css'
import HomeBtn from "./HomeBtn"
import LogoutBtn from "./LogoutBtn"


function Header() {

  return (
    <header className="header-container">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-nav">
        <div className="header-homeBtn">
          <HomeBtn />
        </div>
        <div className="header-logoutBtn">
          <LogoutBtn />
        </div>
      </div>
    </header>
  )
}

export default Header