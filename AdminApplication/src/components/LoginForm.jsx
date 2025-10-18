import { Link, useNavigate } from "react-router-dom"
import '../styles/Login.css'


function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
     navigate('/home'); 
  };

 return (
  <div className="Login-container">
    <h2>Admin Login</h2>
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div className="Login-form-row">
        <label htmlFor="name">Username</label>
        <input type="text" id="name" name="name" placeholder="Enter name" required />
      </div>
      
      <div className="Login-form-row">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter password" required />
      </div>      
        <button type="submit">Log in</button>

    </form>
  </div>
)
}

export default LoginForm