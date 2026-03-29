import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("mayur@gmail.com");
  const [password, setPassword] = useState("Mayur@123");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(response.data));
      return navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      setError(
        error.response?.data?.error || "Login failed. Please try again.",
      );
    }
  };
  return (
    <div className="flex justify-center mt-10">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <h2 className="text-lg font-bold flex justify-center">Login</h2>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-error">{error}</p>
        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
        <button
          className="btn btn-neutral mt-4"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </fieldset>
    </div>
  );
};
export default Login;
