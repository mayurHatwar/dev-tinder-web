import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";
import EditForm from "./EditForm";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const response = useSelector((store) => store.user);
  const userData = response?.user?.data || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        age: userData.age || "",
        gender: userData.gender || "",
        photoUrl: userData.photoUrl || "",
        about: userData.about || "",
        skills: userData.skills || [],
      });
    }
  }, [userData]);

  const handleChange = (field, value) => {
    if (field === "skills") {
      const skillsArray = value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
      setFormData((prev) => ({ ...prev, skills: skillsArray }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          gender: formData.gender,
          photoUrl: formData.photoUrl,
          about: formData.about,
          skills: formData.skills,
        },
        {
          withCredentials: true,
        },
      );

      setError(null);
      dispatch(addUser(response.data));
    } catch (error) {
      setError(error?.response?.data?.error || "Unable to update profile.");
    }
  };
  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "age", label: "Age", type: "number" },
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
    { name: "skills", label: "Skills", type: "text", fullWidth: true },
    { name: "about", label: "About", type: "textarea", fullWidth: true },
  ];

  return (
    <div className="flex justify-center gap-3 mt-4">
      <div className="flex justify-center w-full max-w-2xl">
        <EditForm
          title="Edit Profile"
          fields={fields}
          formValues={formData}
          onFieldChange={handleChange}
          onSubmit={handleProfile}
          submitLabel="Update Profile"
          error={error}
        />
      </div>
      <UserCard user={formData} />
    </div>
  );
};
export default Profile;
