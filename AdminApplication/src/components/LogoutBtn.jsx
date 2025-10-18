import { useNavigate } from "react-router-dom"

function LogoutBtn() {
    const navigate = useNavigate();
  
  function OnLogOutClicked() {
    navigate("/");
  }

  return ( 
      <div className="logout-btn">
      <button className="btn" onClick={OnLogOutClicked}>
        🚪
      </button>
      </div>
  )
}

export default LogoutBtn