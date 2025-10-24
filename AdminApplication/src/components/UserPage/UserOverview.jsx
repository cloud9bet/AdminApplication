import "../../styles/Userpage/UserOverview.css"
function UserOverview({ user }) {
  return (
    <div className="user-overview">
      <h2>{user.userName}</h2>
      <div className="user-info-grid">
        <p>ID: {user.id}</p>
        <p>Balance:<span class="currency-positive">${user.balance}</span> </p>
        <p>Deposit Limit: {user.depositLimit}</p>
        <p>
            Status:{" "}
            <span className={user.activeStatus ? "active" : "deactivated"}>
              {user.activeStatus ? "Active" : "Deactivated"}
            </span>
        </p>
      </div>
    </div>
  );
}
export default UserOverview