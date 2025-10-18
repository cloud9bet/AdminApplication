import { useNavigate } from "react-router-dom"
import SiteInformationPageImg from '../Images/SiteInformationPageLogo.png';
import '../styles/Logo.css'
 

function SiteInformationPageLogo() {
    const navigate = useNavigate();
  
  function OnSiteInformationPageLogoClicked() {
    navigate("/SiteInformation");  
  }

  return ( 
      <div className="SiteInformationPageLogo">
        <img src={SiteInformationPageImg} alt="SiteInformationPageLogo"  onClick={OnSiteInformationPageLogoClicked}/>
      </div>
  )
}

export default SiteInformationPageLogo