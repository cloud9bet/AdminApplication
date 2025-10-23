import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserSearch from "../components/UserPage/UserSearch";
import UserOverview from "../components/UserPage/UserOverview";
import UserTransactionsTable from "../components/UserPage/UserTransactionTable";
import UserDepositsTable from "../components/UserPage/UserDepositsTable";
import UserActions from "../components/UserPage/UserActions";
import { mockUsers } from "../mock/mockUsers";
import { toggleUserStatus } from "../api/userApi";
import "../styles/Userpage/UserPage.css";

function UserPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToggleActive = async () => {
    if (!selectedUser) return;
    try {
      setLoading(true);
      const newStatus = !selectedUser.activeStatus;

      const response = await toggleUserStatus(selectedUser.id, newStatus);

      if (response.success) {
        setSelectedUser((prev) => ({
          ...prev,
          activeStatus: newStatus,
        }));
      }
    } catch (err) {
      console.error("Failed to toggle user status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <Header />

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

      <Footer />
    </div>
  );
}

export default UserPage;
