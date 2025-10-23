import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPageButton.css";
export default function UserInformationButton() {
    const navigate = useNavigate();
  
  function onUserInformationButtonClicked() {
    navigate("/User");  
  }
  return (
    <button className="user-info-btn" onClick={onUserInformationButtonClicked}>
      <FaUser className="user-icon" />
      <span>User Information</span>
    </button>
  );
}
