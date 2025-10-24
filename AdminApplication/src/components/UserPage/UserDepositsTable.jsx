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
              <td class={d.amount>=0? "currency-positive":"currency-negative"}>${d.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDepositsTable