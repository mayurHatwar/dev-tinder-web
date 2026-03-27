import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { BASE_URL } from "../utils/Constant";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const fetchUserProfile = async () => {
    try {
      if (user) return; // If user data is already in the store, skip fetching
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        console.error("Unauthorized access - please log in.");
        navigate("/login");
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Body;
