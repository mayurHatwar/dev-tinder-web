import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import EditForm from "./EditForm";

const SingUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    gender: "other",
    photoUrl: "",
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
          gender: formData.gender,
          photoUrl: formData.photoUrl,
        },
        {
          withCredentials: true,
        },
      );

      setError(null);
      setSuccess(response?.data?.message || "Sign up successful!");
      setFormData({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        gender: "other",
        photoUrl: "",
      });
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
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    { name: "photoUrl", label: "Photo URL", type: "text", fullWidth: true },
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
