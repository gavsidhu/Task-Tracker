import useAuth from "../hooks/useAuth";
import "../styles/Navbar.css"

const Navbar = ({ onLogout }) => {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-right">
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;