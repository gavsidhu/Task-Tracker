import { useEffect, useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const { user, setUser } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post(`${process.env.SERVER_URL}auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token",res.data.token)
      axios.defaults.headers.common["authorization"] = `Bearer ${res.data.token}`;
      setUser(res.data.user)
      navigate('/')
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const res = await axios.post(`${process.env.SERVER_URL}auth/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token",res.data.token)
      axios.defaults.headers.common["authorization"] = `Bearer ${res.data.token}`;
      setUser(res.data.user)
      navigate('/')
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <a className="switch" onClick={switchMode}>
        {isLogin
          ? "Don't have an account? Create an account"
          : "Already have an account? Login"}
      </a>
      <form onSubmit={(e) => handleSubmit(e)}>
        {!isLogin && (
          <input
            type="name"
            name="name"
            placeholder="Name"
            autoComplete="off"
            required
            onChange={(e) => setName(e.currentTarget.value)}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          required
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          required
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default LoginForm;
