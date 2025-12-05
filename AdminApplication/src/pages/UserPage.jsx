import { useState, useEffect } from "react";
import UserSearch from "../components/UserPage/UserSearch";
import UserOverview from "../components/UserPage/UserOverview";
import UserTransactionsTable from "../components/UserPage/UserTransactionTable";
import UserDepositsTable from "../components/UserPage/UserDepositsTable";
import UserActions from "../components/UserPage/UserActions";

import {
  SetUserActiveStateAsync,
  GetAllUserInfoTagsAsync,
  GetAllUserInfoByIdAsync,
  GetUserDepositByIdAsync,
  GetUserTransactionByIdAsync
} from "../services/adminApi";

import "../styles/Userpage/UserPage.css";

function UserPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await GetAllUserInfoTagsAsync();
      if (!result) {
        console.error("Failed to load user tags");
        return;
      }
      setUsers(result);
    };

    fetchUsers();
  }, []);

  const handleSelectUser = async (tag) => {
    setLoading(true);

    const id = tag.userAccountId;

    const [details, deposits, transactions] = await Promise.all([
      GetAllUserInfoByIdAsync(id),
      GetUserDepositByIdAsync(id),
      GetUserTransactionByIdAsync(id)
    ]);

    if (!details) {
      console.error("Failed to load main user details");
      setLoading(false);
      return;
    }

    const fullUser = {
      id: details.userAccountId,
      userName: details.userName,
      balance: details.balance,
      depositLimit: details.depositLimit,
      activeStatus: details.activeStatus,
      deposits: deposits || [],
      transactions: transactions || []
    };

    setSelectedUser(fullUser);
    setLoading(false);
  };


  
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

    setSelectedUser((prev) => ({
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
          <UserSearch users={users} onSelectUser={handleSelectUser} />
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
