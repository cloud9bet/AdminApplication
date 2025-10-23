import "../../styles/Userpage/UserDepositsTable.css"
function UserDepositsTable({ deposits }) {
  if (!deposits || deposits.length === 0) {
    return (
      <div className="user-deposits">
        <h3>Deposits</h3>
        <p>No deposits found.</p>
      </div>
    );
  }

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
          {deposits.map((d) => (
            <tr key={d.depositId}>
              <td>{d.depositId}</td>
              <td>{d.depositDate}</td>
              <td>{d.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDepositsTable