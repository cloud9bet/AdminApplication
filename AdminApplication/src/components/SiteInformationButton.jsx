import { FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPageButton.css";
export default function SiteInformationButton() {
    const navigate = useNavigate();
  
  function onSiteInformationButtonClicked() {
    navigate("/SiteInformation");  
  }
  return (
    <button className="site-info-btn" onClick={onSiteInformationButtonClicked}>
      <FaChartLine className="siteinformation-icon" />
      <span>Site Information</span>
    </button>
  );
}
