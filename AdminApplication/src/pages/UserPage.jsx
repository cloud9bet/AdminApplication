import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserSearch from "../components/UserPage/UserSearch";
import UserOverview from "../components/UserPage/UserOverview";
import UserTransactionsTable from "../components/UserPage/UserTransactionTable";
import UserDepositsTable from "../components/UserPage/UserDepositsTable";
import UserActions from "../components/UserPage/UserActions";
import { mockUsers } from "../mock/mockUsers";
import {SetUserActiveStateAsync} from "../services/adminApi";
import "../styles/Userpage/UserPage.css";

function UserPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToggleActive = async () => {
    if (!selectedUser) return;

    setLoading(true);
    const newStatus = !selectedUser.activeStatus;

    const ok = await SetUserActiveStateAsync(selectedUser.id, newStatus);

    if (!ok) {
      console.error("Backend rejected toggle");
      setLoading(false);
      return;
    }

    setSelectedUser(prev => ({
      ...prev,
      activeStatus: newStatus,
    }));

  setLoading(false);
};

  return (
    <div className="main-container">

      <div className="UserPage-container">
        <h1>User Management</h1>

        {!selectedUser ? (
          <UserSearch users={mockUsers} onSelectUser={setSelectedUser} />
        ) : (
          <div className="user-info-section">
            <UserOverview user={selectedUser} />
            <UserTransactionsTable transactions={selectedUser.transactions} />
            <UserDepositsTable deposits={selectedUser.deposits} />
            <UserActions
              user={selectedUser}
              onBack={() => setSelectedUser(null)}
              onToggleActive={handleToggleActive}
              loading={loading}
            />
          </div>
        )}
      </div>

    </div>
  );
}

export default UserPage;
