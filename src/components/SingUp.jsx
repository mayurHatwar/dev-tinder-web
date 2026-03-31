import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import EditForm from "./EditProfile";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.emailId,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );

      setError(null);
      setSuccess(response?.data?.message || "Sign up successful!");

      const userState =
        response?.data?.data && typeof response.data.data === "object"
          ? response.data.data
          : response.data;

      dispatch(addUser(userState));

      setFormData({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
      });

      navigate("/profile");
    } catch (err) {
      setSuccess(null);
      setError(err?.response?.data?.error || "Unable to register user.");
    }
  };

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "emailId", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  return (
    <div className="w-2/4 mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <EditForm
        title="Create your account"
        fields={fields}
        formValues={formData}
        onFieldChange={handleChange}
        onSubmit={handleSignUp}
        submitLabel="Sign Up"
        error={error || success}
      />

      {success && <p className="text-success mt-2">{success}</p>}
    </div>
  );
};

export default SingUp;
