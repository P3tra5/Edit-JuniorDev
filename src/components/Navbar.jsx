import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
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
      </nav>

      <Outlet />
    </>
  )
};

export default Navbar;