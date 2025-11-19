import "../../styles/Userpage/UserTransactionTable.css";

function UserTransactionsTable({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="user-transactions">
        <h3>Transaction History</h3>
        <p>No transactions found.</p>
      </div>
    );
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

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
          {sortedTransactions.map((t) => (
            <tr key={t.transactionId}>
              <td>{t.date}</td>
              <td>{t.gameName}</td>
              <td className={t.amount >= 0 ? "currency-positive" : "currency-negative"}>
                {t.amount}$
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTransactionsTable;
