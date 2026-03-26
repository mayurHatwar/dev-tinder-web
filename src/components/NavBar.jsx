import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <div className="flex">
          <img
            src="https://w0.peakpx.com/wallpaper/153/89/HD-wallpaper-coding-lover-black-coding-heart-lover-programing-red.jpg"
            className="w-20 h-15 rounded-2xl"
          />
          <a className="btn btn-ghost text-xl">Dev Tinder</a>
        </div>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end flex gap-4">
            <p>Welcome, {user.data.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.data.photoUrl ||
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
