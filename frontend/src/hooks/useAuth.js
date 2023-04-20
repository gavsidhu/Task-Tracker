import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const response = await axios.get("http://localhost:3001/auth/me");
    console.log("me: ", response.data)

    if (response.data && response.data.user) {
      setUser({
          email: response.data.user.email,
      });
    } else {
      setUser(null);
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
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
