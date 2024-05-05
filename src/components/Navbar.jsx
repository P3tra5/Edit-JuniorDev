import { useState, useContext } from "react";
import AdminContext from "./kontekst";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  const [adminChecked, setAdminChecked] = useState(false); 
  const { admin, setAdmin } = useContext(AdminContext);

  const handleCheckboxChange = (event) => {
    setAdminChecked(event.target.checked); 
    setAdmin(event.target.checked ? 'on' : 'off'); 
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/aktivnosti">Aktivnosti</Link>
          </li>
          <li>
            <Link to="/volonteri">Volonteri</Link>
          </li>
          <li>
            <Link to="/udruge">Udruge</Link>
          </li>
        </ul>
        <div>
          <input
            type="checkbox"
            id="adminCheckbox"
            checked={adminChecked} 
            onChange={handleCheckboxChange}
          />
          <label htmlFor="adminCheckbox">Admin</label>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Navbar;