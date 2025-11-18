import "../../styles/Userpage/UserOverview.css";

function UserOverview({ user }) {
  return (
    <div className="user-overview">
      <h2>{user.userName}</h2>

      <div className="user-info-grid">

        <div className="info-box">
          ID: {user.id}
        </div>

        <div className="info-box">
          Balance:
          <span className="currency-positive"> {user.balance}$</span>
        </div>

        <div className="info-box">
          Deposit Limit: {user.depositLimit}
        </div>

        <div className="info-box">
          Status:
          <span className={user.activeStatus ? "active" : "deactivated"}>
            {user.activeStatus ? " Active" : " Deactivated"}
          </span>
        </div>

      </div>
    </div>
  );
}

export default UserOverview;
