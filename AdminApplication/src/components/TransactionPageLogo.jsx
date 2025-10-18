import { useNavigate } from "react-router-dom"
import TransactionPageImg from '../Images/TransactionPageLogo.png';
import '../styles/Logo.css'
 

function TransactionPageLogo() {
    const navigate = useNavigate();
  
  function OnTransactionPageLogoClicked() {
    navigate("/Transactions");  
  }

  return ( 
      <div className="TransactionPageLogo">
        <img src={TransactionPageImg} alt="TransactionPageLogo"  onClick={OnTransactionPageLogoClicked}/>
      </div>
  )
}

export default TransactionPageLogo