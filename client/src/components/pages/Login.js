import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/AuthContext'

const Login = ({ history }) => {
  const { loginUser, clearError, userAuth, errors } = useContext(AuthContext);
  useEffect(() => {
    if (userAuth) {
      history.push('/');
    }
  }, [userAuth, history]);
  
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    clearError();
  }

  const submit = e => {
    e.preventDefault();
    loginUser(user);
    clearError();
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
        <input type="submit" value="Sign In" className="btn" />
      </form>
      <div className="question">
        {errors && (
          <button className="btn danger">
            {errors.msg ? errors.msg : errors.error[0].msg}
            <span onClick={clearError}>X</span>
          </button>
        )}
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login
