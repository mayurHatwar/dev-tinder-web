import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import vibeCodingBg from "../assets/vibe-coding.png";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      data-theme="dim"
      className="app-shell min-h-screen"
      style={{
        backgroundImage: `linear-gradient(155deg, rgba(4, 8, 18, 0.78), rgba(8, 16, 30, 0.84)), url(${vibeCodingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <NavBar />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Body;
