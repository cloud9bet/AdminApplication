import "../../styles/Userpage/UserTransactionTable.css"
function UserTransactionsTable({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="user-transactions">
        <h3>Transaction History</h3>
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="user-transactions">
      <h3>Transaction History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Game</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.transactionId}>
              <td>{t.transactionDate}</td>
              <td>{t.gameName}</td>
              <td>{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTransactionsTable