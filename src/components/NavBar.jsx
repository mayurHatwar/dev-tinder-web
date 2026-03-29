import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true }); // Make API call to log out the user
    dispatch(removeUser()); // Clear user data from Redux store
    return navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <div className="flex">
          <img
            src="https://w0.peakpx.com/wallpaper/153/89/HD-wallpaper-coding-lover-black-coding-heart-lover-programing-red.jpg"
            className="w-20 h-15 rounded-2xl"
          />
          <Link to="/" className="btn btn-ghost text-xl">
            Dev Tinder
          </Link>
        </div>
      </div>
      <div className="flex gap-2">
        {
          <div className="dropdown dropdown-end flex gap-4">
            <p>Welcome, {user?.data?.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user?.data?.photoUrl ||
                    "https://w0.peakpx.com/wallpaper/153/89/HD-wallpaper-coding-lover-black-coding-heart-lover-programing-red.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default NavBar;
