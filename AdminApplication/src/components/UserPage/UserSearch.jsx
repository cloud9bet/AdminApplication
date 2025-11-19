import "../../styles/Userpage/UserSearch.css";

function UserSearch({ users, onSelectUser }) {
  const activeUsers = Array.isArray(users)
    ? users.filter(u => u.userName !== "DELETED")
    : [];

  if (activeUsers.length === 0) {
    return (
      <div className="user-search">
        <h3>Select a user:</h3>
        <div>No users found.</div>
      </div>
    );
  }

  return (
    <div className="user-search">
      <h3>Select a user:</h3>
      <ul>
        {activeUsers.map(u => (
          <li
            key={u.userAccountId}
            onClick={() => onSelectUser(u)}
          >
            {u.userAccountId}: {u.userName}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default UserSearch;
