import "../../styles/Userpage/UserSearch.css"
function UserSearch({ users, onSelectUser }) {
  return (
    <div className="user-search">
      <h3>Select a user:</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id} onClick={() => onSelectUser(u)}>
            {u.id}: {u.userName}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserSearch