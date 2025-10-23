import "../../styles/Userpage/UserOverview.css"
function UserOverview({ user }) {
  return (
    <div className="user-overview">
      <h2>{user.userName}</h2>
      <div className="user-info-grid">
        <p>ID: {user.id}</p>
        <p>Balance: {user.balance}</p>
        <p>Deposit Limit: {user.depositLimit}</p>
        <p>Status: {user.activeStatus ? "Active" : "Deactivated"}</p>
      </div>
    </div>
  );
}
export default UserOverview