import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TaskList from "./TaskList";

const Home = () => {
  const navigate = useNavigate()
  const signOut  = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
    <header>
      <Navbar onLogout={signOut}/>
    </header>
      <h1 className="home-heading">Tasks</h1>
      <TaskList />
    </>
  );
};

export default Home;