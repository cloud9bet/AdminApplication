import { useNavigate } from "react-router-dom"
import { FaSignOutAlt} from "react-icons/fa";
import '../styles/SettingsPageButton.css'
function LogoutBtn() {
    const navigate = useNavigate();
  
  function OnLogOutClicked() {
    navigate("/");
  }

  return ( 
      <div className="logout-btn">
      <button className="logoutbtn" onClick={OnLogOutClicked}>  {/*THIS */}
        <FaSignOutAlt/>
      </button>
      </div>
  )
}

export default LogoutBtn