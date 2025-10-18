import { useNavigate } from "react-router-dom"
import UserPageLogoImg from '../Images/UserPageLogo.png';
import '../styles/Logo.css'
 

function UserPageLogo() {
    const navigate = useNavigate();
  
  function OnUserPageLogoClicked() {
    navigate("/User");  
  }

  return ( 
      <div className="UserPageLogo">
        <img src={UserPageLogoImg} alt="UserPageLogo"  onClick={OnUserPageLogoClicked}/>
      </div>
  )
}

export default UserPageLogo