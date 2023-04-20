import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  loading: false
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)


  const fetchUser = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:3001/auth/me");

    if (response.data && response.data.user) {
      setUser({
          email: response.data.user.email,
      });
    } else {
      setUser(null);
    }
    setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setUser(null);
    }
  }, []);
  return (
    <AuthContext.Provider value={{user,setUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
