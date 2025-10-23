import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPageButton.css";

export default function TransactionsButton() {
  const navigate = useNavigate();

  function onTransactionsButtonClicked() {
    navigate("/Transactions");
  }

  return (
    <button className="transaction-btn" onClick={onTransactionsButtonClicked}>
      <FaCoins className="transaction-icon" />
      <span>Transactions</span>
    </button>
  );
}
