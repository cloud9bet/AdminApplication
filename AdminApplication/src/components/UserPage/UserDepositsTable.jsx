import "../../styles/Userpage/UserDepositsTable.css";

function UserDepositsTable({ deposits }) {
  if (!deposits || deposits.length === 0) {
    return (
      <div className="user-deposits">
        <h3>Deposits</h3>
        <p>No deposits found.</p>
      </div>
    );
  }

  // Sort newest → oldest
  const sortedDeposits = [...deposits].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="user-deposits">
      <h3>Deposits</h3>
      <table>
        <thead>
          <tr>
            <th>Deposit ID</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedDeposits.map((d) => (
            <tr key={d.depositId}>
              <td>{d.depositId}</td>
              <td>{d.date}</td>
              <td className={d.amount >= 0 ? "currency-positive" : "currency-negative"}>
                {d.amount}$
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDepositsTable;
