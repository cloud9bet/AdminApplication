import "../../styles/Userpage/UserActions.css";

function UserActions({ user, onBack, onToggleActive, loading }) {
  return (
    <div className="user-actions">
      <button onClick={onBack}>Back</button>
      <button
        className={user.activeStatus ? "deactivate" : "reactivate"}
        onClick={onToggleActive}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : user.activeStatus
          ? "Deactivate User"
          : "Reactivate User"}
      </button>
    </div>
  );
}

export default UserActions;
